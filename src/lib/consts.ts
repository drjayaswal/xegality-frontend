export const CONSUMER_NAVLINKS = [
  { title: "Dashboard", href: "/consumer/dashboard" },
  { title: "Get a Lawyer", href: "/consumer/find-lawyers" },
  { 
    title: "Consult CA", 
    href: "",
    hasDropdown: true,
    dropdownItems: [
      {
        title: "Company Registration and Setup",
        icon: "building",
        items: [
          { title: "Register A Private Limited Company", href: "", icon: "building" },
          { title: "Limited Liability Partnership Registration", href: "", icon: "handshake" },
          { title: "One Person Company Registration", href: "", icon: "user" },
          { title: "Partnership Firm Registration", href: "", icon: "users" },
          { title: "Producer Company Registration", href: "", icon: "industry" },
          { title: "Increase Authorized Capital", href: "", icon: "money-bill" },
          { title: "Convert Private into Public Limited Company", href: "", icon: "exchange-alt" },
          { title: "Close the LLP", href: "", icon: "times-circle" },
          { title: "Convert Partnership into LLP Company", href: "", icon: "random" },
          { title: "Company Fresh Start Scheme (CFSS)", href: "", icon: "sync" }
        ]
      },
      {
        title: "Licenses & Registrations",
        icon: "certificate",
        items: [
          { title: "Digital Signature Certificate Registration", href: "", icon: "certificate" },
          { title: "Udyam Registration Online", href: "", icon: "file-signature" },
          { title: "MSME Registration", href: "", icon: "building" },
          { title: "ISO Certification", href: "", icon: "award" },
          { title: "Online FSSAI Registration", href: "", icon: "utensils" },
          { title: "Import Export Code Registration", href: "", icon: "truck" },
          { title: "Revocation and Cancellation of GST", href: "", icon: "ban" },
          { title: "NGO Registration In India", href: "", icon: "hands-helping" },
          { title: "Appointment of Director in A Company", href: "", icon: "user-tie" },
          { title: "Apeda RCMC", href: "", icon: "file-contract" }
        ]
      },
      {
        title: "Tax & Compliances",
        icon: "file-invoice-dollar",
        items: [
          { title: "GST Registration", href: "", icon: "file-invoice-dollar" },
          { title: "Income Tax Return Filing for LLP", href: "", icon: "file-invoice" },
          { title: "GST Return Filing Online", href: "", icon: "file-alt" },
          { title: "Accounting And Bookkeeping Services", href: "", icon: "calculator" },
          { title: "Director Removal", href: "", icon: "user-minus" },
          { title: "Change Address", href: "", icon: "map-marker-alt" },
          { title: "Shop And Establishment Registration", href: "", icon: "store" },
          { title: "Indirect Tax", href: "", icon: "percentage" },
          { title: "Changes to LLP Agreement", href: "", icon: "edit" },
          { title: "Accounting and Book-keeping Package", href: "", icon: "book" }
        ]
      },
      {
        title: "Trademark and Intellectual Property",
        icon: "trademark",
        items: [
          { title: "Trademark Registration", href: "", icon: "trademark" },
          { title: "Trademark Search", href: "", icon: "search" },
          { title: "Trademark Renewal", href: "", icon: "sync" }
        ]
      }
    ]
  },
  { title: "Legal Services", href: "/consumer/legal-services" },
  { 
    title: "More", 
    href: "",
    hasDropdown: true,
    dropdownItems: [
      {
        title: "Resources",
        icon: "book",
        items: [
          { title: "Knowledge Archive", href: "/archives", icon: "archive" },
          { title: "About", href: "/about", icon: "info-circle" },
          { title: "Contact", href: "/contact", icon: "envelope" }
        ]
      }
    ]
  }
];

export const UNPROTECTED_ROUTES = [
  "/",
  "/login",
  "/terms-and-conditions",
  "/privacy-policy",
  "/about",
  "/contact",
];

export const LAWYER_NAVLINKS = [
  { title: "Dashboard", href: "/lawyer/dashboard/xegality-ai" },
  { title: "Manage Interns", href: "/lawyer/dashboard/manage-interns" },
  { title: "Archives", href: "/archives" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];
export const STUDENT_NAVLINKS = [
  { title: "Dashboard", href: "/student/dashboard/xegality-ai" },
  { title: "Research", href: "/student/dashboard/research" },
  { title: "Internships", href: "/student/dashboard/internships" },
  { title: "Archives", href: "/archives" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];
