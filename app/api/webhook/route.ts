import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            throw new Error("Stripe Webhook Secret is not defined in the environment variables");
        }

        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error: unknown) {
        if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
            console.error("[WEBHOOK_SIGNATURE_ERROR]", error.message);
            return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
        } else if (error instanceof Error) {
            console.error("[WEBHOOK_ERROR]", error.message);
            return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
        } else {
            console.error("[WEBHOOK_UNKNOWN_ERROR]", error);
            return new NextResponse("Unknown error occurred in webhook", { status: 400 });
        }
    }

    const session = event.data.object as Stripe.Checkout.Session;

    try {
        if (event.type === "checkout.session.completed") {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            if (!session?.metadata?.userId) {
                return new NextResponse("User id is required", { status: 400 });
            }

            await prismadb.userSubscription.create({
                data: {
                    userId: session.metadata.userId,
                    stripeSubscriptionId: subscription.id,
                    stripeCustomerId: subscription.customer as string,
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                },
            });
        }

        if (event.type === "invoice.payment_succeeded") {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            await prismadb.userSubscription.update({
                where: {
                    stripeSubscriptionId: subscription.id,
                },
                data: {
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                },
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("[DATABASE_ERROR]", error.message);
            return new NextResponse(`Database Error: ${error.message}`, { status: 500 });
        } else {
            console.error("[UNKNOWN_ERROR]", error);
            return new NextResponse("Unknown error occurred", { status: 500 });
        }
    }

    return new NextResponse(null, { status: 200 });
}
