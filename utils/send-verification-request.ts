// ./utils/send-verification-request.ts
import { resend } from "@/lib/resend";

export const sendVerificationRequest = async (params: {
  identifier: string;
  token: string;
  url: string;
}) => {
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM is not set");
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: params.identifier,
      subject: `Your temporary login code is ${params.token}`,
      html: html({ token: params.token, url: params.url }),
      text: text({ token: params.token, url: params.url }),
    });
  } catch (error) {
    console.log({ error });
  }
};

// Email HTML body
export function html({ url, token }: Record<"url" | "token", string>) {
  return `
  <!DOCTYPE html>
  <html style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2;line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;font-feature-settings:normal;--white:#fff;--black:#000;--gray-050:#fafbfc;--gray-100:#ebeef2;--gray-200:#d0d3d7;--gray-300:#b2b5b9;--gray-400:#9a9ea4;--gray-500:#7b7f87;--gray-600:#5a5f68;--gray-700:#444854;--gray-800:#30313a;--gray-900:#1a1b21;--red-050:#fffafa;--red-100:#ffe5e9;--red-200:#fbbfc7;--red-300:#ff909f;--red-400:#ff7082;--red-500:#ff455d;--red-600:#dd243c;--red-700:#c11027;--red-800:#8f0718;--red-900:#51050e;--orange-050:#fff8f3;--orange-100:#ffe8d8;--orange-200:#ffc59b;--orange-300:#fc9c66;--orange-400:#fd812d;--orange-500:#f35815;--orange-600:#c43c02;--orange-700:#962d00;--orange-800:#672002;--orange-900:#391303;--yellow-050:#fffbe4;--yellow-100:#fff1a8;--yellow-200:#fed54a;--yellow-300:#f2b600;--yellow-400:#d19f03;--yellow-500:#a78103;--yellow-600:#835c01;--yellow-700:#5c4716;--yellow-800:#41320c;--yellow-900:#261c02;--green-050:#effff3;--green-100:#d7fbdf;--green-200:#a9ecb8;--green-300:#75db8c;--green-400:#40d763;--green-500:#27b648;--green-600:#13862e;--green-700:#19652a;--green-800:#10481d;--green-900:#0a2912;--blue-050:#f3fbff;--blue-100:#ddf2ff;--blue-200:#a9dffe;--blue-300:#73c7f9;--blue-400:#47b7f8;--blue-500:#1e9de7;--blue-600:#0e73cc;--blue-700:#144eb6;--blue-800:#0e3682;--blue-900:#071f4d;--purple-050:#f9f8ff;--purple-100:#eeeaff;--purple-200:#d4c9fe;--purple-300:#b7a5fb;--purple-400:#a18bf5;--purple-500:#8467f3;--purple-600:#624bbb;--purple-700:#4b3990;--purple-800:#3e1f75;--purple-900:#261149;--bg-primary:var(--white);--bg-secondary:var(--gray-050);--bg-tertiary:var(--gray-100);--border-primary:var(--gray-100);--border-secondary:var(--gray-200);--border-action:var(--gray-200);--text-primary:var(--gray-900);--text-secondary:var(--gray-600);--text-blue:var(--blue-600);--text-green:var(--green-600);--text-orange:var(--orange-600);--text-red:var(--red-600);--text-red-disabled:var(--red-600);--text-purple:var(--purple-600);--graph-border:var(--gray-200);--graph-blue-gradient-start:var(--blue-100);--graph-blue-gradient-stop:var(--blue-100);--graph-blue-light:var(--blue-200);--graph-blue-dark:var(--blue-500);--graph-orange-light:var(--orange-200);--graph-orange-dark:var(--orange-500);--graph-green-light:var(--green-200);--graph-green-dark:var(--green-500)">
     <head style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2">
        <link rel="preconnect" href="https://fonts.gstatic.com" style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&amp;display=swap&amp;display=swap" rel="stylesheet" style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2">
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&amp;display=swap" rel="stylesheet" style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2">
     </head>
     <body style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2;margin:0;line-height:inherit;font-size:14px;font-family:Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#1a1b21;background-color:#fff;padding-top:32px;padding-bottom:32px;padding-left:16px;padding-right:16px">
        <div class="max-w-2xl mx-auto" style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2;margin-left:auto;margin-right:auto;max-width:42rem">
           <div class="mb-5" style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2;margin-bottom:40px">
              <div>
                  <h1 style="color:#333;font-size:20px">Login</h1>
                  <a href="${url}">Click here to log in with this magic link</a>
               <div>
            <div style="color:#333333;margin-top:12px">Or, copy and paste this temporary login code:</div>
            <pre style="padding:16px 24px;border:1px solid #EEEEEE;background-color:#F4F4F4;border-radius:3px;font-family:monospace;margin-bottom:24px">${token}</pre></div>
           </div>
           <div class="my-4 px-2 py-1.5 border rounded text-secondary inline-block" style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2;margin-top:32px;margin-bottom:32px;display:inline-block;border-radius:6px;border-width:1px;padding-left:16px;padding-right:16px;color:#5a5f68;padding-top:12px;padding-bottom:12px">
              <p style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2;margin:0">If you didn't try to login, you can safely ignore this email.</p>
           </div>
        </div>
     </body>
  </html>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
export function text({ url, token }: Record<"url" | "token", string>) {
  return `Sign in to \n${url}\n\n with ${token}`;
}
