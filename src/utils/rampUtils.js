/**
 * Utility functions for Coinbase Onramp and Offramp URL generation
 */
import { getOnrampBuyUrl } from "@coinbase/onchainkit/fund";

// Coinbase Developer Platform Project ID
const CDP_PROJECT_ID = process.env.NEXT_PUBLIC_CDP_PROJECT_ID;

/**
 * Generates a Coinbase Onramp URL with the provided parameters
 */
export function generateOnrampURL(params) {
  const {
    asset,
    amount,
    network,
    paymentMethod,
    paymentCurrency,
    address,
    redirectUrl,
    sessionToken,
    enableGuestCheckout,
  } = params;

  // Parse amount to a number for presetFiatAmount
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    throw new Error("Invalid amount provided");
  }

  // Base URL for Coinbase Onramp
  const baseUrl = "https://pay.coinbase.com/buy/select-asset";

  // Build query parameters
  const queryParams = new URLSearchParams();

  // If using session token, only include sessionToken and optional UI params
  if (sessionToken) {
    queryParams.append("sessionToken", sessionToken);

    if (asset) queryParams.append("defaultAsset", asset);
    if (network) queryParams.append("defaultNetwork", network);
    if (paymentMethod) {
      const formattedPaymentMethod = paymentMethod.toUpperCase();
      queryParams.append("defaultPaymentMethod", formattedPaymentMethod);
    }
    if (numericAmount > 0) {
      queryParams.append("presetFiatAmount", numericAmount.toString());
    }
    if (paymentCurrency) {
      queryParams.append("fiatCurrency", paymentCurrency);
    }
    queryParams.append("partnerUserId", address.substring(0, 49));
    if (redirectUrl) {
      queryParams.append("redirectUrl", redirectUrl);
    }
  } else {
    // Traditional flow without session token
    queryParams.append("appId", CDP_PROJECT_ID);

    const addressesObj = {};
    addressesObj[address || "0x0000000000000000000000000000000000000000"] = [
      network,
    ];
    queryParams.append("addresses", JSON.stringify(addressesObj));

    if (asset) {
      queryParams.append("assets", JSON.stringify([asset]));
      queryParams.append("defaultAsset", asset);
    }

    if (network) queryParams.append("defaultNetwork", network);

    if (paymentMethod) {
      const formattedPaymentMethod = paymentMethod.toUpperCase();
      queryParams.append("defaultPaymentMethod", formattedPaymentMethod);
    }

    if (numericAmount > 0) {
      queryParams.append("presetFiatAmount", numericAmount.toString());
    }

    if (paymentCurrency) {
      queryParams.append("fiatCurrency", paymentCurrency);
    }

    queryParams.append("partnerUserId", address.substring(0, 49));

    if (redirectUrl) {
      queryParams.append("redirectUrl", redirectUrl);
    } else {
      queryParams.append(
        "redirectUrl",
        "https://coinbase-on-off-ramp.vercel.app/onramp"
      );
    }

    if (enableGuestCheckout !== undefined) {
      queryParams.append("enableGuestCheckout", enableGuestCheckout.toString());
    }
  }

  return `${baseUrl}?${queryParams.toString()}`;
}

/**
 * Generates a Coinbase Offramp URL with the provided parameters
 */
export function generateOfframpURL(params) {
  try {
    const {
      asset,
      amount,
      network,
      cashoutMethod,
      address,
      redirectUrl,
      sessionToken,
    } = params;

    const baseUrl = "https://pay.coinbase.com/v3/sell/input";
    const queryParams = new URLSearchParams();

    if (sessionToken) {
      queryParams.append("sessionToken", sessionToken);

      if (asset) queryParams.append("defaultAsset", asset);
      if (network) queryParams.append("defaultNetwork", network);
      if (cashoutMethod)
        queryParams.append("defaultCashoutMethod", cashoutMethod);

      const numericAmount = parseFloat(amount);
      if (!isNaN(numericAmount) && numericAmount > 0) {
        queryParams.append("presetFiatAmount", numericAmount.toString());
      }

      queryParams.append(
        "partnerUserId",
        address ? address.substring(0, 49) : "anonymous-" + Date.now()
      );
      if (redirectUrl) {
        queryParams.append("redirectUrl", redirectUrl);
      }
    } else {
      queryParams.append("appId", CDP_PROJECT_ID);

      const userId = address
        ? address.substring(0, 49)
        : "anonymous-" + Date.now();
      queryParams.append("partnerUserId", userId);

      const addressesObj = {};
      const validAddress =
        address || "0x4315d134aCd3221a02dD380ADE3aF39Ce219037c";
      addressesObj[validAddress] = [network || "ethereum"];
      queryParams.append("addresses", JSON.stringify(addressesObj));

      queryParams.append("assets", JSON.stringify([asset]));

      if (asset) queryParams.append("defaultAsset", asset);
      if (network) queryParams.append("defaultNetwork", network);
      if (cashoutMethod)
        queryParams.append("defaultCashoutMethod", cashoutMethod);

      const numericAmount = parseFloat(amount);
      if (!isNaN(numericAmount) && numericAmount > 0) {
        queryParams.append("presetFiatAmount", numericAmount.toString());
      }

      queryParams.append(
        "redirectUrl",
        redirectUrl || "https://coinbase-on-off-ramp.vercel.app/offramp"
      );
    }

    return `${baseUrl}?${queryParams.toString()}`;
  } catch (error) {
    console.error("Error generating offramp URL:", error);
    return `https://pay.coinbase.com/v3/sell/input?appId=${CDP_PROJECT_ID}&partnerUserId=anonymous&assets=["USDC"]&addresses={"0x4315d134aCd3221a02dD380ADE3aF39Ce219037c":["ethereum"]}&redirectUrl=${encodeURIComponent(
      "https://coinbase-on-off-ramp.vercel.app/offramp"
    )}`;
  }
}

/**
 * Generates a transaction status URL for checking the status of a transaction
 */
export function generateTransactionStatusURL(transactionId) {
  return `https://pay.coinbase.com/api/v1/transactions/${transactionId}`;
}
