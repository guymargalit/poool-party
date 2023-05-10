// Email HTML body
export function html({
    url,
    token
  }) {
    // Insert invisible space into domains and email address to prevent both the
    // email address and the domain from being turned into a hyperlink by email
    // clients like Outlook and Apple mail, as this is confusing because it seems
    // like they are supposed to click on their email address to sign in.

    return `
    <!DOCTYPE html>
    <html style="box-sizing:border-box;border-width:0;border-style:solid;border-color:#ebeef2;line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;font-feature-settings:normal;--white:#fff;--black:#000;--gray-050:#fafbfc;--gray-100:#ebeef2;--gray-200:#d0d3d7;--gray-300:#b2b5b9;--gray-400:#9a9ea4;--gray-500:#7b7f87;--gray-600:#5a5f68;--gray-700:#444854;--gray-800:#30313a;--gray-900:#1a1b21;">
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
  export function text({ url, host, token }) {
    return `Sign in to ${host}\n${url}\n\n with ${token}`;
  }
  