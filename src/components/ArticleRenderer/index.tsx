'use client';

import type { ComponentProps } from 'react';

import Typography from '@mui/material/Typography';
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
} from 'html-react-parser';

import 'suneditor/dist/css/suneditor.min.css';
import { IArticle } from '@/interface/article';

type ITypografy = ComponentProps<typeof Typography>;

function parseStyle(style: string): React.CSSProperties {
  return style.split(';').reduce((acc, rule) => {
    const [key, value] = rule.split(':');
    if (!key || !value) return acc;
    const formattedKey = key
      .trim()
      .replace(/-([a-z])/g, (_, g) => g.toUpperCase());
    acc[formattedKey] = value.trim();
    return acc;
  }, {} as React.CSSProperties);
}

function renderMuiTypographyFromHtml(htmlString: string) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const { name, children, attribs } = domNode;

        const tagToVariantMap: Record<string, string> = {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          p: 'body1',
        };

        if (tagToVariantMap[name]) {
          return (
            <Typography
              variant={tagToVariantMap[name] as ITypografy['variant']}
              className={attribs?.class || undefined}
              style={attribs?.style ? parseStyle(attribs.style) : undefined}
            >
              {domToReact(children as unknown as ChildNode[], options)}7
            </Typography>
          );
        }
      }
    },
  };

  return parse(htmlString, options);
}

type ContentProps = {
  data: IArticle;
};

export default function ArticleRenderer({ data }: ContentProps) {
  return (
    <div className="sun-editor-editable">
      {renderMuiTypographyFromHtml(data.content)}
    </div>
  );
}
