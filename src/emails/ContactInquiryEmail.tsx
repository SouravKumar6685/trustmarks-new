import React from "react";

export interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  service?: string;
  location?: string;
  message?: string;
  submissionTime?: string;
  sourcePage?: string;
}

export const ContactInquiryEmail: React.FC<ContactEmailProps> = ({
  name = "Prospective Client",
  email = "client@example.com",
  phone = "+91 99999 99999",
  service = "Security Services",
  location = "Gujarat, India",
  message = "No additional message provided",
  submissionTime = new Date().toLocaleString(),
  sourcePage = "Trustmarks Website",
}) => {
  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        margin: "0",
        padding: "30px 10px",
        color: "#334155",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Header with Dark Slate & Amber theme */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            padding: "32px 24px",
            textAlign: "center",
            borderBottom: "3px solid #ea580c",
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(234, 88, 12, 0.2)",
              color: "#fb923c",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              padding: "4px 14px",
              borderRadius: "20px",
              marginBottom: "10px",
            }}
          >
            New Client Lead &bull; Proposal Request
          </div>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "22px",
              margin: "0",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            TRUSTMARKS MANAGEMENT SERVICES
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              margin: "6px 0 0",
            }}
          >
            Commercial Inquiry received from {sourcePage}
          </p>
        </div>

        {/* Main Content */}
        <div style={{ padding: "28px 24px" }}>
          {/* Key-Value Details Card */}
          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "16px 20px",
              marginBottom: "20px",
            }}
          >
            {/* Client Name */}
            <div style={{ padding: "10px 0", borderBottom: "1px solid #edf2f7" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Client Name
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>
                {name}
              </div>
            </div>

            {/* Phone Number */}
            <div style={{ padding: "10px 0", borderBottom: "1px solid #edf2f7" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Contact Phone
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginTop: "2px" }}>
                <a href={`tel:${phone}`} style={{ color: "#ea580c", textDecoration: "none" }}>
                  &#9742; {phone}
                </a>
              </div>
            </div>

            {/* Work Email */}
            <div style={{ padding: "10px 0", borderBottom: "1px solid #edf2f7" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Work Email
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginTop: "2px" }}>
                <a href={`mailto:${email}`} style={{ color: "#ea580c", textDecoration: "none" }}>
                  &#9993; {email}
                </a>
              </div>
            </div>

            {/* Service Category */}
            <div style={{ padding: "10px 0", borderBottom: "1px solid #edf2f7" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Service Category
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#ea580c", marginTop: "2px" }}>
                {service}
              </div>
            </div>

            {/* Facility Location */}
            <div style={{ padding: "10px 0", borderBottom: "1px solid #edf2f7" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Facility Location / City
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginTop: "2px" }}>
                {location}
              </div>
            </div>

            {/* Timestamp & Source */}
            <div style={{ padding: "10px 0" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Timestamp &amp; Page
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                {submissionTime} &bull; {sourcePage}
              </div>
            </div>
          </div>

          {/* Message / Project Scope */}
          <div
            style={{
              backgroundColor: "#fff7ed",
              borderLeft: "4px solid #ea580c",
              padding: "16px",
              borderRadius: "0 10px 10px 0",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#9a3412",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Project Scope / Client Note:
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#431407",
                margin: "0",
                whiteSpace: "pre-wrap",
              }}
            >
              {message}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ textAlign: "center", padding: "10px 0 16px" }}>
            <a
              href={`mailto:${email}?subject=Re:%20Trustmarks%20Proposal%20Inquiry%20(${service})`}
              style={{
                display: "inline-block",
                backgroundColor: "#ea580c",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "13px",
                padding: "12px 24px",
                borderRadius: "30px",
                margin: "4px",
                boxShadow: "0 4px 12px rgba(234, 88, 12, 0.3)",
              }}
            >
              Reply via Email &rarr;
            </a>
            <a
              href={`tel:${phone}`}
              style={{
                display: "inline-block",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "13px",
                padding: "12px 24px",
                borderRadius: "30px",
                margin: "4px",
              }}
            >
              Call Client Direct
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            padding: "20px 24px",
            textAlign: "center",
            borderTop: "1px solid #e2e8f0",
            fontSize: "11px",
            color: "#94a3b8",
          }}
        >
          <p style={{ margin: "0 0 4px 0", fontWeight: 600, color: "#64748b" }}>
            Trustmarks Management Services Pvt. Ltd.
          </p>
          <p style={{ margin: "0" }}>
            Infocity / SG Highway Corridor &bull; Gandhinagar &bull; Ahmedabad &bull; Gujarat &bull; India
          </p>
        </div>
      </div>
    </div>
  );
};
