// An absolute URL makes the router treat the PDF as a document link instead of
// resolving it as an in-app route.
export const resumeUrl = new URL('/resume.pdf', window.location.origin).href;
