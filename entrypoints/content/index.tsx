import "@/assets/main.css";
import { LinkedInProvider } from "@/components/contexts/linkedin-context.tsx";
import ReactDOM from "react-dom/client";
import LinkedInScript from "../../components/linkedin-script.tsx";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "language-learning-content-box",
      position: "inline",
      onMount: (container) => {
        console.log(container);
        const root = ReactDOM.createRoot(container);
        root.render(
          <LinkedInProvider>
            <LinkedInScript />
          </LinkedInProvider>
        );
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
