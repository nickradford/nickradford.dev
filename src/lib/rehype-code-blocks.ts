type HastNode = {
  type?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

const CODE_BLOCK_WRAPPER_CLASS = "code-block-wrapper";
const CODE_COPY_BUTTON_CLASS = "code-copy-button";
const CODE_TITLE_CLASS = "rehype-code-title";

function isElement(node: HastNode | undefined): node is HastNode {
  return node?.type === "element";
}

function getClassList(node: HastNode): string[] {
  const className = node.properties?.className;

  if (Array.isArray(className)) {
    return className.map(String);
  }

  if (typeof className === "string") {
    return className.split(/\s+/).filter(Boolean);
  }

  return [];
}

function setClassList(node: HastNode, classList: string[]) {
  node.properties = node.properties ?? {};
  node.properties.className = classList;
}

function hasClass(node: HastNode, className: string) {
  return getClassList(node).includes(className);
}

function removeClass(node: HastNode, className: string) {
  setClassList(
    node,
    getClassList(node).filter((item) => item !== className),
  );
}

function isCodeBlock(node: HastNode | undefined) {
  return isElement(node) && node.tagName === "pre";
}

function isCodeTitle(node: HastNode | undefined) {
  return isElement(node) && hasClass(node, CODE_TITLE_CLASS);
}

function getLanguage(node: HastNode) {
  const properties = node.properties ?? {};
  const language = properties.dataLanguage ?? properties["data-language"];

  if (typeof language === "string") {
    return language.toLowerCase();
  }

  const code = node.children?.find(
    (child) => isElement(child) && child.tagName === "code",
  );
  const languageClass = code
    ? getClassList(code).find((className) => className.startsWith("language-"))
    : undefined;

  return languageClass?.replace("language-", "").toLowerCase() ?? "";
}

function removeLineNumbers(node: HastNode) {
  if (isElement(node) && hasClass(node, "line-number")) {
    removeClass(node, "line-number");
  }

  node.children?.forEach(removeLineNumbers);
}

function createCopyButton(): HastNode {
  return {
    type: "element",
    tagName: "button",
    properties: {
      type: "button",
      className: [CODE_COPY_BUTTON_CLASS],
      ariaLabel: "Copy code to clipboard",
    },
    children: [{ type: "text", value: "Copy" }],
  };
}

function createCodeBlockWrapper(children: HastNode[]): HastNode {
  return {
    type: "element",
    tagName: "div",
    properties: {
      className: [CODE_BLOCK_WRAPPER_CLASS],
    },
    children,
  };
}

function transformChildren(node: HastNode) {
  if (!Array.isArray(node.children)) {
    return;
  }

  for (let index = 0; index < node.children.length; index += 1) {
    const child = node.children[index];

    if (isCodeBlock(child)) {
      if (getLanguage(child) === "text") {
        removeLineNumbers(child);
      }

      const previous = node.children[index - 1];
      const copyButton = createCopyButton();

      if (isCodeTitle(previous)) {
        node.children.splice(
          index - 1,
          2,
          createCodeBlockWrapper([previous, child, copyButton]),
        );
        index -= 1;
      } else {
        node.children[index] = createCodeBlockWrapper([child, copyButton]);
      }

      continue;
    }

    transformChildren(child);
  }
}

export default function rehypeCodeBlocks() {
  return (tree: HastNode) => {
    transformChildren(tree);
  };
}
