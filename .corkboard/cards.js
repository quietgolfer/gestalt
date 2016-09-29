import React from 'react';
import { card, registerCard, ns as registerNamespace } from 'corkboard';
import cs from 'classnames';
import Markdown from 'corkboard/lib/components/Markdown';
import postcss from 'postcss';
import safeParser from 'postcss-safe-parser';

export function ns(name, text = '') {
  registerNamespace(name);
  registerCard(
    <div>
      <h1 className="mt0 mb6 display-l dark-gray">{name}</h1>
      <div className="md-col-8 lg-col-6">
        <Markdown text={text} />
      </div>
    </div>
  );
}

export function stylesTable(src) {
  const root = postcss().process(src, { parser: safeParser }).root;
  const rules = {};

  root.walkRules(rule => {
    if (rule.selector === ':root') {
      return;
    }

    rules[rule.selector] = {};
    rule.walkDecls(decl => {
      rules[rule.selector][decl.prop] = decl.value;
    });
  });

  card(
    'Table of Styles',
    <table className="col-12 border-bottom" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th className="border-bottom text-left text-m gray p1">Selector</th>
          <th className="border-bottom text-left text-m gray p1">Rules</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(rules).map((rule, i) => (
          <tr key={i}>
            <td
              className={cs('no-wrap border-bottom p1', { 'bg-light-gray': (i % 2 === 0) })}
              style={{ verticalAlign: 'top' }}
            >
              <code>{rule}</code>
            </td>
            <td className={cs('p1', { 'bg-light-gray': (i % 2 === 0) })}>
              <code>
                {Object.keys(rules[rule]).map((prop, index) => (
                  <div key={index}>{prop}: {rules[rule][prop]}</div>
                ))}
              </code>
            </td>
          </tr>
         ))}
      </tbody>
    </table>
  );
}
