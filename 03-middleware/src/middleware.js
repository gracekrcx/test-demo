export function middleware(request) {
  console.log(request.url, "middleware");
}

export const config = {
  matcher: ["/cart"],
};
