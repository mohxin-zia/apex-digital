const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

export interface Web3FormsResult {
  success: boolean;
  message: string;
}

/**
 * Submit form fields to Web3Forms. The access key is public by design
 * (Web3Forms rate-limits and validates server-side), so it lives in a
 * VITE_ env var and ships to the client.
 */
export async function submitToWeb3Forms(
  fields: Record<string, string | boolean>,
  options?: { subject?: string; from_name?: string },
): Promise<Web3FormsResult> {
  if (!ACCESS_KEY) {
    return {
      success: false,
      message: "Form is not configured. Please try again later.",
    };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: options?.subject,
        from_name: options?.from_name ?? "APEX Website",
        ...fields,
      }),
    });

    const data = (await res.json()) as Web3FormsResult;
    return {
      success: data.success === true,
      message: data.message ?? (res.ok ? "Message sent." : "Something went wrong."),
    };
  } catch {
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
