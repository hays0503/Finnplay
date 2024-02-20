import "@img/hooray-hip.gif";

/**
 * Renders the ErrorPage component.
 * @returns {JSX.Element} The rendered ErrorPage component.
 */
export default function ErrorPage() {
  return (
    <div
      id="error-page"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignContent: "stretch",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>404</h1>
      <h2>Как ты сюда попал ?!</h2>
      <p>
        Вернись на <a href="/">главную</a> страницу.
      </p>
      <img src="/hooray-hip.gif" alt="Hooray!" />
    </div>
  );
}
