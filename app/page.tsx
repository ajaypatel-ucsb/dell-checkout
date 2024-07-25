"use client";
import Image from "next/image";
import { createSession } from "@/actions/createSession";
import { useEffect } from "react";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";
import "./adyen.css";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function Home({ searchParams }: any) {
  const container = useRef(null);
  const params = useSearchParams();

  const currency = params.get("currency") || searchParams?.currency || "USD";
  const amount = params.get("amount") || searchParams?.amount || 146900;
  const country = params.get("country") || searchParams?.country || "DE";

  useEffect(() => {
    const startSession = async () => {
      const response = await createSession(currency, amount, country);

      const configuration = {
        environment: "test", // Change to 'live' for the live environment.
        clientKey: "test_KQGTAFYLM5HGJKM4LW65GFTOIMKHMA72", // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
        analytics: {
          enabled: true, // Set to false to not send analytics data to Adyen.
        },
        session: {
          id: response.id,
          sessionData: response.sessionData,
        },
        // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
        // For example, this is 3D Secure configuration for cards:
        paymentMethodsConfiguration: {
          card: {
            hasHolderName: false,
            holderNameRequired: true,
            billingAddressRequired: false,
          },
        },
      };
      const checkout = await AdyenCheckout(configuration);
      const dropinComponent = checkout
        .create("dropin")
        .mount(container.current!);
    };

    startSession();
  }, [currency, country, amount]);

  return (
      <main className="">
        <div ref={container}></div>
      </main>
  );
}
