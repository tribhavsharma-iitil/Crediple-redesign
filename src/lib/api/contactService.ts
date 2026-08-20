interface ContactFormData {
    fullName: string;
    email: string;
    subject: string;
    description: string;
    brand?: string;
}

interface ContactResponse {
    status: number;
    message: string;
    error?: string;
    data: null | Record<string, any>;
    errors: any[];
    brand?: string;
}

export async function submitContactForm(
    data: ContactFormData
): Promise<{ success: boolean; message: string }> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error("API URL is not configured");
    }

    const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    let responseData: ContactResponse;

    try {
        responseData = await response.json();
    } catch {
        throw new Error("Invalid response from server");
    }

    if (!response.ok) {
        const errorMessage =
            responseData?.message ||
            responseData?.error ||
            "Failed to submit form";
        throw new Error(errorMessage);
    }

    return {
        success: true,
        message: responseData.message || "Message sent successfully!",
    };
}
