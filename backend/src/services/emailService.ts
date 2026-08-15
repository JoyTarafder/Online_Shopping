import transporter from "../config/mailer";

const YEAR = new Date().getFullYear();

// ─── Shared Ultra-Modern Luxury Layout Shell ───────────────────────────────────

function emailShell(bodyContent: string, previewText = ""): string {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>ShajSutro</title>
  ${previewText ? `<span style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${previewText}</span>` : ""}
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Outer Canvas Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;box-shadow:0 20px 40px rgba(0,0,0,0.08);border-radius:24px;overflow:hidden;">

          <!-- ── LUXURY HEADER ── -->
          <tr>
            <td style="background:linear-gradient(135deg, #09090b 0%, #18181b 100%);padding:40px 48px 36px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;padding:6px 18px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.3);border-radius:100px;margin-bottom:12px;">
                      <span style="font-size:10px;font-weight:700;letter-spacing:0.25em;color:#f59e0b;text-transform:uppercase;">Official Verification</span>
                    </div>
                    <h1 style="margin:0;font-size:32px;font-weight:900;letter-spacing:4px;color:#ffffff;text-transform:uppercase;font-family:'Segoe UI',Roboto,sans-serif;">SHAJSUTRO</h1>
                    <p style="margin:8px 0 0;font-size:12px;color:#a1a1aa;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;">Fashion · Elegance · Modern Wardrobe</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── MAIN CONTENT BODY ── -->
          <tr>
            <td style="background-color:#ffffff;padding:48px 48px 40px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- ── HELP & SUPPORT BANNER ── -->
          <tr>
            <td style="background-color:#ffffff;padding:0 48px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px 24px;">
                <tr>
                  <td style="vertical-align:middle;">
                    <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#0f172a;">Need Assistance?</p>
                    <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">Our support team is available Mon – Sat (10 AM – 6 PM)</p>
                  </td>
                  <td style="vertical-align:middle;text-align:right;">
                    <a href="mailto:support@shajsutro.com" style="display:inline-block;background-color:#0f172a;color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.08em;text-decoration:none;padding:10px 20px;border-radius:100px;box-shadow:0 4px 12px rgba(15,23,42,0.15);">
                      Get Support
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background-color:#09090b;padding:32px 48px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;padding-bottom:16px;">
                    <a href="#" style="font-size:11px;color:#a1a1aa;text-decoration:none;margin:0 12px;font-weight:500;">Privacy Policy</a>
                    <span style="color:#3f3f46;font-size:11px;">•</span>
                    <a href="#" style="font-size:11px;color:#a1a1aa;text-decoration:none;margin:0 12px;font-weight:500;">Terms of Service</a>
                    <span style="color:#3f3f46;font-size:11px;">•</span>
                    <a href="#" style="font-size:11px;color:#a1a1aa;text-decoration:none;margin:0 12px;font-weight:500;">Unsubscribe</a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <p style="margin:0;font-size:11px;color:#71717a;line-height:1.8;">
                      &copy; ${YEAR} ShajSutro Ltd. All rights reserved.<br />
                      Dhaka, Bangladesh • <a href="https://shajsutro.com" style="color:#f59e0b;text-decoration:none;">shajsutro.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

// ─── Ultra-Modern High-Contrast OTP Code Box ────────────────────────────────────

function otpBox(code: string): string {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
  <tr>
    <td align="center">
      <div style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);border:2px solid #f59e0b;border-radius:20px;padding:28px 40px;box-shadow:0 12px 24px rgba(245,158,11,0.15);text-align:center;max-width:380px;">
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.25em;color:#f59e0b;text-transform:uppercase;">Your Verification Passcode</p>
        <p style="margin:0 0 10px;font-size:42px;font-weight:900;letter-spacing:14px;color:#ffffff;font-family:'Courier New',Consolas,monospace;text-shadow:0 2px 10px rgba(0,0,0,0.5);">${code}</p>
        <div style="display:inline-block;padding:4px 14px;background:rgba(255,255,255,0.08);border-radius:100px;">
          <span style="font-size:11px;color:#cbd5e1;font-weight:600;">⏱️ Valid for 10 minutes</span>
        </div>
      </div>
    </td>
  </tr>
</table>
  `.trim();
}

// ─── Modern Step Card Row ───────────────────────────────────────────────────────

function stepCardRow(num: string, title: string, desc: string): string {
  return `
<tr>
  <td style="padding-bottom:12px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px 18px;">
      <tr>
        <td style="width:36px;vertical-align:middle;">
          <div style="width:32px;height:32px;border-radius:10px;background:#0f172a;color:#f59e0b;font-size:13px;font-weight:800;line-height:32px;text-align:center;">
            ${num}
          </div>
        </td>
        <td style="padding-left:14px;vertical-align:middle;">
          <p style="margin:0;font-size:13px;font-weight:700;color:#0f172a;">${title}</p>
          <p style="margin:2px 0 0;font-size:12px;color:#64748b;line-height:1.5;">${desc}</p>
        </td>
      </tr>
    </table>
  </td>
</tr>
  `.trim();
}

// ─── Security Notice Box ────────────────────────────────────────────────────────

function securityNoticeBox(text: string): string {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
  <tr>
    <td style="background:#fffbeb;border-left:4px solid #f59e0b;border-top:1px solid #fef3c7;border-right:1px solid #fef3c7;border-bottom:1px solid #fef3c7;border-radius:0 12px 12px 0;padding:16px 20px;">
      <p style="margin:0;font-size:12px;color:#92400e;line-height:1.6;">
        <strong style="color:#b45309;">🔒 Security Notice:</strong> ${text}
      </p>
    </td>
  </tr>
</table>
  `.trim();
}

// ─── Send: Email Verification ─────────────────────────────────────────────────

export const sendVerificationEmail = async (
  email: string,
  code: string
): Promise<void> => {
  const body = `
    <!-- Header Greeting -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="width:64px;height:64px;margin:0 auto 16px;border-radius:20px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);line-height:64px;font-size:28px;">
        ✉️
      </div>
      <h2 style="margin:0 0 10px;font-size:26px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">Verify Your Email Address</h2>
      <p style="margin:0;font-size:15px;color:#64748b;line-height:1.6;max-width:440px;margin:0 auto;">
        Welcome to <strong style="color:#0f172a;">ShajSutro</strong>! Please enter the passcode below to activate your account and start your fashion journey.
      </p>
    </div>

    <!-- Passcode Display Box -->
    ${otpBox(code)}

    <!-- Step Timeline Instructions -->
    <p style="margin:0 0 16px;font-size:12px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.1em;">Simple Verification Steps</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${stepCardRow("01", "Copy Passcode", "Copy the 6-digit security code displayed above.")}
      ${stepCardRow("02", "Return to Browser", "Switch back to the ShajSutro sign-up page.")}
      ${stepCardRow("03", "Paste & Verify", "Enter the code in the verification screen and submit.")}
    </table>

    <!-- Security Notice -->
    ${securityNoticeBox("ShajSutro will never request your password or confidential details over email. If you did not sign up for an account, please ignore this email.")}
  `;

  await transporter.sendMail({
    from: `"ShajSutro" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your ShajSutro account",
    html: emailShell(
      body,
      "Your ShajSutro verification code is inside — valid for 10 minutes."
    ),
  });
};

// ─── Send: Password Reset ─────────────────────────────────────────────────────

export const sendPasswordResetEmail = async (
  email: string,
  code: string
): Promise<void> => {
  const body = `
    <!-- Header Greeting -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="width:64px;height:64px;margin:0 auto 16px;border-radius:20px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);line-height:64px;font-size:28px;">
        🔑
      </div>
      <h2 style="margin:0 0 10px;font-size:26px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">Reset Your Password</h2>
      <p style="margin:0;font-size:15px;color:#64748b;line-height:1.6;max-width:440px;margin:0 auto;">
        We received a request to reset the password for your ShajSutro account linked to <strong style="color:#0f172a;">${email}</strong>.
      </p>
    </div>

    <!-- Passcode Display Box -->
    ${otpBox(code)}

    <!-- Step Timeline Instructions -->
    <p style="margin:0 0 16px;font-size:12px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.1em;">How to Reset Password</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${stepCardRow("01", "Copy Code", "Copy the 6-digit passcode shown above.")}
      ${stepCardRow("02", "Enter Code", "Paste the code in the password reset form.")}
      ${stepCardRow("03", "Create New Password", "Set a strong new password to secure your account.")}
    </table>

    <!-- Security Notice -->
    ${securityNoticeBox("If you did not request a password reset, your account is safe. No changes will be made unless you confirm with this passcode.")}
  `;

  await transporter.sendMail({
    from: `"ShajSutro" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your ShajSutro password",
    html: emailShell(
      body,
      "Your ShajSutro password reset code is inside — valid for 10 minutes."
    ),
  });
};

// ─── Send: Order Confirmation ──────────────────────────────────────────────────

export const sendOrderConfirmationEmail = async (
  recipientEmail: string,
  order: any
): Promise<void> => {
  const orderId = order._id ? order._id.toString().slice(-8).toUpperCase() : "RECENT";
  const dateStr = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : new Date().toLocaleDateString();

  const customerName =
    `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim() ||
    "Valued Customer";

  const paymentMethodLabel =
    order.paymentMethod === "bkash"
      ? "bKash"
      : order.paymentMethod === "nagad"
      ? "Nagad"
      : order.paymentMethod === "rocket"
      ? "Rocket"
      : "Cash on Delivery (COD)";

  const isPaid = order.paymentStatus === "paid";
  const paymentStatusText = isPaid
    ? `Paid ${order.txnId ? `(TxnID: ${order.txnId})` : ""}`
    : order.paymentStatus === "refunded"
    ? "Payment Returned"
    : "Cash on Delivery / Pending";

  const itemsHtml = (order.items || [])
    .map(
      (item: any) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #f1f5f9;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            ${
              item.image
                ? `
            <td style="width:64px;vertical-align:middle;padding-right:16px;">
              <img src="${item.image}" alt="${item.name}" width="56" height="56" style="width:56px;height:56px;object-fit:cover;border-radius:12px;border:1px solid #e2e8f0;display:block;" />
            </td>
            `
                : ""
            }
            <td style="vertical-align:middle;">
              <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#0f172a;line-height:1.3;">${item.name}</p>
              <div style="font-size:12px;color:#64748b;line-height:1.4;">
                ${
                  item.size
                    ? `<span style="display:inline-block;background:#f1f5f9;color:#334155;font-weight:600;padding:2px 8px;border-radius:6px;font-size:11px;margin-right:6px;">Size: ${item.size}</span>`
                    : ""
                }
                ${
                  item.color
                    ? `<span style="display:inline-block;background:#f1f5f9;color:#334155;font-weight:600;padding:2px 8px;border-radius:6px;font-size:11px;margin-right:6px;">Color: ${item.color}</span>`
                    : ""
                }
                <span style="color:#64748b;font-weight:500;">Qty: <strong style="color:#0f172a;">${item.quantity}</strong></span>
              </div>
            </td>
            <td style="text-align:right;vertical-align:middle;font-size:15px;font-weight:800;color:#0f172a;">
              ৳${(item.price * item.quantity).toFixed(2)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
    )
    .join("");

  const body = `
    <!-- Header Badge & Celebration Title -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;padding:6px 20px;background:linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);border:1px solid #6ee7b7;border-radius:100px;margin-bottom:12px;box-shadow:0 4px 12px rgba(16,185,129,0.12);">
        <span style="font-size:11px;font-weight:800;color:#047857;text-transform:uppercase;letter-spacing:0.18em;">✨ Order Confirmed</span>
      </div>
      <h2 style="margin:8px 0 6px;font-size:28px;font-weight:900;color:#0f172a;letter-spacing:-0.5px;line-height:1.2;">Thank You For Your Order!</h2>
      <p style="margin:0;font-size:14px;color:#64748b;">Order Reference: <strong style="color:#0f172a;font-family:'Courier New',monospace;font-size:15px;background:#f1f5f9;padding:2px 8px;border-radius:6px;">#${orderId}</strong> &bull; ${dateStr}</p>
    </div>

    <!-- Order Timeline Progress Bar -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px 16px;">
      <tr>
        <td style="text-align:center;width:25%;">
          <div style="width:32px;height:32px;border-radius:50%;background:#10b981;color:#ffffff;font-size:14px;font-weight:800;line-height:32px;margin:0 auto 6px;box-shadow:0 4px 10px rgba(16,185,129,0.3);">✓</div>
          <p style="margin:0;font-size:11px;font-weight:700;color:#0f172a;">Placed</p>
        </td>
        <td style="text-align:center;width:25%;">
          <div style="width:32px;height:32px;border-radius:50%;background:#0f172a;color:#f59e0b;font-size:14px;font-weight:800;line-height:32px;margin:0 auto 6px;box-shadow:0 4px 10px rgba(15,23,42,0.2);">2</div>
          <p style="margin:0;font-size:11px;font-weight:700;color:#0f172a;">Confirmed</p>
        </td>
        <td style="text-align:center;width:25%;">
          <div style="width:32px;height:32px;border-radius:50%;background:#e2e8f0;color:#94a3b8;font-size:14px;font-weight:800;line-height:32px;margin:0 auto 6px;">3</div>
          <p style="margin:0;font-size:11px;font-weight:600;color:#94a3b8;">Shipped</p>
        </td>
        <td style="text-align:center;width:25%;">
          <div style="width:32px;height:32px;border-radius:50%;background:#e2e8f0;color:#94a3b8;font-size:14px;font-weight:800;line-height:32px;margin:0 auto 6px;">4</div>
          <p style="margin:0;font-size:11px;font-weight:600;color:#94a3b8;">Delivered</p>
        </td>
      </tr>
    </table>

    <!-- Customer & Delivery Information Cards Grid -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="vertical-align:top;width:49%;background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;">👤 Customer Info</p>
          <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${customerName}</p>
          <p style="margin:4px 0 0;font-size:12px;color:#64748b;">✉️ ${recipientEmail}</p>
          <p style="margin:3px 0 0;font-size:12px;color:#64748b;">📞 ${order.shippingAddress?.phone || "N/A"}</p>
        </td>
        <td style="width:2%;"></td>
        <td style="vertical-align:top;width:49%;background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;">📍 Delivery Address</p>
          <p style="margin:0;font-size:13px;color:#334155;line-height:1.5;font-weight:600;">${order.shippingAddress?.address || ""}</p>
          <p style="margin:4px 0 0;font-size:12px;color:#64748b;">
            ${[order.shippingAddress?.city, order.shippingAddress?.state, order.shippingAddress?.zip].filter(Boolean).join(", ")}
          </p>
        </td>
      </tr>
    </table>

    <!-- Order Items List Table -->
    <div style="margin-bottom:28px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span style="font-size:12px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.1em;">Order Summary (${(order.items || []).length} items)</span>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:0 20px;">
        ${itemsHtml}
      </table>
    </div>

    <!-- Financial Receipt Breakdown -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px 24px;margin-bottom:28px;">
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#64748b;">Subtotal</td>
        <td style="padding:6px 0;text-align:right;font-size:13px;font-weight:600;color:#0f172a;">৳${(order.subtotal || 0).toFixed(2)}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#64748b;">Delivery Fee</td>
        <td style="padding:6px 0;text-align:right;font-size:13px;font-weight:600;color:#0f172a;">${order.shippingCost === 0 ? "<span style='color:#10b981;font-weight:700;'>FREE</span>" : `৳${(order.shippingCost || 0).toFixed(2)}`}</td>
      </tr>
      ${
        order.discount > 0
          ? `
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#059669;font-weight:600;">Promo Discount</td>
        <td style="padding:6px 0;text-align:right;font-size:13px;font-weight:700;color:#059669;">−৳${order.discount.toFixed(2)}</td>
      </tr>
      `
          : ""
      }
      <tr>
        <td style="padding:14px 0 0;border-top:1px dashed #cbd5e1;font-size:15px;font-weight:800;color:#0f172a;">Grand Total</td>
        <td style="padding:14px 0 0;border-top:1px dashed #cbd5e1;text-align:right;font-size:20px;font-weight:900;color:#0f172a;">৳${(order.total || 0).toFixed(2)}</td>
      </tr>
    </table>

    <!-- Payment Status Highlight Banner -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="background:${isPaid ? "#ecfdf5" : "#eff6ff"};border:1px solid ${isPaid ? "#a7f3d0" : "#bfdbfe"};border-radius:14px;padding:16px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <p style="margin:0 0 2px;font-size:11px;font-weight:800;color:${isPaid ? "#047857" : "#1e40af"};text-transform:uppercase;letter-spacing:0.08em;">Payment Information</p>
                <p style="margin:0;font-size:13px;color:${isPaid ? "#065f46" : "#1e3a8a"};">
                  Method: <strong>${paymentMethodLabel}</strong> &nbsp;&bull;&nbsp; Status: <strong>${paymentStatusText}</strong>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- CTA Button -->
    <div style="text-align:center;margin-top:36px;margin-bottom:12px;">
      <a href="https://shajsutro.com/profile" style="display:inline-block;background:linear-gradient(135deg, #09090b 0%, #1e293b 100%);color:#ffffff;font-size:13px;font-weight:800;letter-spacing:0.12em;text-decoration:none;padding:16px 36px;border-radius:100px;box-shadow:0 12px 24px rgba(15,23,42,0.25);text-transform:uppercase;">
        Track & Manage Order →
      </a>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"ShajSutro" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `✨ Order Confirmation #${orderId} — ShajSutro`,
      html: emailShell(
        body,
        `Your ShajSutro order #${orderId} for ৳${(order.total || 0).toFixed(2)} has been placed successfully!`
      ),
    });
  } catch (err) {
    console.error("Failed to send order confirmation email:", err);
  }
};
