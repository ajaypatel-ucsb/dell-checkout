"use server";
import { Client, CheckoutAPI, Types } from "@adyen/api-library";

export async function createSession(currency = 'USD', amount = 146900, country = 'US') {
  const client = new Client({
    apiKey:
      "AQEphmfxLYLHbBZBw0m/n3Q5qf3VbK5hIax6ddkWUnPilNrWpVatf3i4k+YQwV1bDb7kfNy1WIxIIkxgBw==-MYZUj8AvTyQqNYPxms6JrmD1LxdNnKdxPCpA71B3B0A=-i1ivbn<IxCY3$#W:K](",
    environment: "TEST",
  });

  const createCheckoutSessionRequest = {
    merchantAccount: "DELL_PM_EMEATEST_TEST",
    amount: {
      value: amount,
      currency
    },
    returnUrl: "http://httpbin.org/anything",
    reference: "YOUR_PAYMENT_REFERENCE",
    countryCode: country
  };

  const checkoutAPI = new CheckoutAPI(client);
  const response = await checkoutAPI.PaymentsApi.sessions(
    createCheckoutSessionRequest,
  );

  return { id: response.id, sessionData: response.sessionData };
}
