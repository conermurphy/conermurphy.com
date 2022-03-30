import { ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function copyToClip() {
  navigator.clipboard.writeText(window?.location?.href);
}

function idLinkCreator(children: ReactNode): string {
  return typeof children === 'string'
    ? children
        // Regex to remove all punctionation from the original string
        .replaceAll(/['!"#$%&\\'()\\*+,\-\\.\\/:;<=>?@\\[\\\]\\^_`{|}~']/g, '')
        // Convert any spaces to '-'
        .replaceAll(' ', '-')
        // Replace any '--' to a '-'
        .replaceAll(/(--)/g, '-')
        // Make it all lower case
        .toLowerCase()
    : '#';
}

const components = {
  h2: ({ children }: IProps): JSX.Element => {
    return (
      <h2 id={idLinkCreator(children)} className="font-semibold">
        <a
          href={`#${idLinkCreator(children)}`}
          onClick={() => {
            return copyToClip();
          }}
        >
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children }: IProps): JSX.Element => {
    return (
      <h3 id={idLinkCreator(children)} className="font-semibold">
        <a
          href={`#${idLinkCreator(children)}`}
          onClick={() => {
            return copyToClip();
          }}
        >
          {children}
        </a>
      </h3>
    );
  },
  h4: ({ children }: IProps): JSX.Element => {
    return (
      <h4 id={idLinkCreator(children)} className="font-semibold">
        <a
          href={`#${idLinkCreator(children)}`}
          onClick={() => {
            return copyToClip();
          }}
        >
          {children}
        </a>
      </h4>
    );
  },
  h5: ({ children }: IProps): JSX.Element => {
    return (
      <h5 id={idLinkCreator(children)} className="font-semibold">
        <a
          href={`#${idLinkCreator(children)}`}
          onClick={() => {
            return copyToClip();
          }}
        >
          {children}
        </a>
      </h5>
    );
  },
  h6: ({ children }: IProps): JSX.Element => {
    return (
      <h6 id={idLinkCreator(children)} className="font-semibold">
        <a
          href={`#${idLinkCreator(children)}`}
          onClick={() => {
            return copyToClip();
          }}
        >
          {children}
        </a>
      </h6>
    );
  },
};

export default components;
