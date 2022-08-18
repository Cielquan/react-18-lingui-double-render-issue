import { i18n } from "@lingui/core";
import type { I18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import type { DependencyList } from "react";

const useUpdateEffect = (
  callback: () => void,
  dependencies: DependencyList,
  cleanupCallback?: () => void
): void => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return undefined;
    }
    callback();
    return cleanupCallback;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

async function changeLocale(locale: string, i18n_: I18n): Promise<void> {
  let data;
  if (process.env.NODE_ENV === "production") {
    data = await import(`../../translations/locales/${locale}/messages`);
  } else {
    data = await import(`@lingui/loader!../../translations/locales/${locale}/messages.po`);
  }
  const { messages } = data;

  i18n_.load(locale, messages);
  i18n_.activate(locale);
}

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const locale = "en-US";

  // run only once on the first render (for server side)
  const firstRender = useRef(true);
  if (firstRender.current) {
    // loadPlurals(i18n);
    changeLocale(locale, i18n);
    firstRender.current = false;
  }

  useUpdateEffect(() => {
    changeLocale(locale, i18n);
  }, [i18n, locale]);

  return (
    <I18nProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nProvider>
  );
};

export default App;
