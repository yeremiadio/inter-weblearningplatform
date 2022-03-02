import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import Editor from "../../../components/CodePenEditor/Editor";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CodeEditorNavbar from "../../../components/Navbar/CodeEditorNavbar";
import { useRouter } from "next/router";

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await axios.get(process.env.baseUrl + "/api/codes");
  const codes = await res.data.data;

  // Get the paths we want to pre-render based on posts
  const paths = codes.map((item) => ({
    params: { slug: item.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const { params } = ctx;
  // Pass data to the page via props
  const res = await axios.get(
    process.env.baseUrl + `/api/codes/single/${params.slug}`
  );
  const code = await res.data.data;
  return { props: { code } };
}

function frontend({ code }) {
  const parsedCode = JSON.parse(code.code);
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [html, setHtml] = useState(
    parsedCode ? parsedCode.html : "<h1>Hello World</h1>"
  );
  const [css, setCss] = useState(
    parsedCode ? parsedCode.css : "* { font-family: 'Arial'; }"
  );
  const [js, setJs] = useState(
    parsedCode ? parsedCode.js : "function testWorld() { alert('test') }"
  );
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    if (
      auth.isAuthenticated === false ||
      auth.user.token === undefined ||
      auth.user.token === ""
    ) {
      dispatch({
        type: RESET_USER,
      });
      dispatch({
        type: RESET_ERRORS,
      });
      router.replace("/login");
      toast({
        title: "Error",
        description: "Not Authenticated",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      return ac.abort();
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);
  return (
    <div className="bg-gray-900">
      <CodeEditorNavbar
        isEdited={true}
        data={{
          type: "frontend",
          code: JSON.stringify({ html: html, css: css, js: js }),
        }}
        auth={auth.user.user}
      />
      <div className="mt-20 min-h-screen h-1/2">
        <div className="flex flex-col lg:flex-row border-t border-gray-700 py-4">
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
          />
          <Editor
            language="javascript"
            displayName="JS"
            value={js}
            onChange={setJs}
          />
        </div>
        <div className="h-screen bg-white">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default frontend;
