'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function loginUser(loginData: { username: string; password: string }) {
  try {
    const response = await fetch("http://127.0.0.1:8080/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();

    if (response.ok) {
      const responseCookies = response.headers.getSetCookie();

      const nextResponse = NextResponse.json({ success: true, message: result.message });

      for (const cookie of responseCookies) {
        nextResponse.headers.append('Set-Cookie', cookie);
      }

      const cookieStore = await cookies();
      for (const cookie of responseCookies) {
        const parsedCookie = parseCookie(cookie);
        if (parsedCookie) {
          cookieStore.set(parsedCookie.name, parsedCookie.value, parsedCookie.options);
        }
      }

      console.log("Stored Cookies:", cookieStore.getAll());

      return result;
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: response.status });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong!" }, { status: 500 });
  }
}

// Helper function to parse a cookie string
function parseCookie(cookieString: string) {
  const parts = cookieString.split(';')[0].split('=');
  if (parts.length === 2) {
    const name = parts[0].trim();
    const value = parts[1].trim();
    const options: { [key: string]: string | boolean | number } = {
      path: '/',
      httpOnly: true,
    };

    // Parse other cookie options
    cookieString.split(';').slice(1).forEach(option => {
      const [key, val] = option.split('=').map(part => part.trim());
      if (key.toLowerCase() === 'expires') {
        options.expires = new Date(val).getTime();
      } else if (key.toLowerCase() === 'max-age') {
        options.maxAge = parseInt(val);
      } else {
        options[key.toLowerCase()] = val || true;
      }
    });

    return { name, value, options };
  }
  return null;
}