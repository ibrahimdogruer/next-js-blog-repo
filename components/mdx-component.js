import Pre from "./pre";

export const mdxComponents = {
  pre: ({ children }) => <Pre {...children.props} />,
  p: (props) => <p className="text-trueGray-800 dark:text-white" {...props} />,
  h1: (props) => <h1 className="text-trueGray-800 dark:text-white" {...props} />,
  h2: (props) => <h2 className="text-trueGray-800 dark:text-white" {...props} />,
  h3: (props) => <h3 className="text-trueGray-800 dark:text-white" {...props} />,
  h4: (props) => <h4 className="text-trueGray-800 dark:text-white" {...props} />,
  h5: (props) => <h5 className="text-trueGray-800 dark:text-white" {...props} />,
  h6: (props) => <h6 className="text-trueGray-800 dark:text-white" {...props} />,
};
