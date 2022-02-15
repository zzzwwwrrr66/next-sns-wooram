import type { AppProps } from 'next/app';
import Link from "next/Link";
import { useRouter } from 'next/router';

// css 
import '../style/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//store 
import wrapper from '../store/configureStore';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp);
