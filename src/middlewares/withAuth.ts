import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const onlyAdminPage = ["/dashboard"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: Array<String>
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    //
    //
    //
    // JIKA KITA BERADA DI HALAMAN YANG PERLU AUTH
    if (requireAuth.includes(pathname)) {
      //
      //
      //
      // AMBIL TOKENNYA
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      //
      //
      //
      // JIKA TOKEN BERNILAI NULL MAKA BUAT URL SEKALIAN DENGAN PARAMS NYA UNTUK KEMBALI KE HALAMAN YANG DITUJU JIKA SUDAH LOGIN, LALU TENDANG PENGGUNA KESANA
      if (!token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      //
      //
      //
      //
      if (token.role !== "admin" && onlyAdminPage.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      //
      //
      //
      // JIKA AUTHENTIKASI BERHASIL (TOKEN ADA) YASUDAH LANJUTKAN KE MIDDLEWARE
      return middleware(req, next);
    }
  };
}
