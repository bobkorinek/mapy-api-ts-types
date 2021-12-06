import { Class, Interface, Method, Property } from '../types';
import { createType } from './variable';

export const createComment = (o: Method | Class | Interface | Property) => {
    const commentSections = [];

    if (o.comment) {
        commentSections.push(o.comment);
    }
    if ('events' in o) {
        o.events.forEach((e) => {
            commentSections.push('@fires ' + e.name + (e.comment ? ' ' + e.comment : ''));
        });
    }
    if (o.url) {
        commentSections.push('@see ' + o.url);
    }
    if ('arguments' in o) {
        o.arguments.forEach((a) => {
            const createName = () => {
                if (a.optional) {
                    if (a.defaultValue) {
                        if (a.type === 'string') {
                            return '[' + a.name + '="' + a.defaultValue + '"]';
                        } else {
                            return '[' + a.name + '=' + a.defaultValue + ']';
                        }
                    } else {
                        return '[' + a.name + ']';
                    }
                } else {
                    return a.name;
                }
            };

            commentSections.push(
                '@param ' + (a.type ? '{' + createType(a.type) + '} ' : '') + createName() + (a.comment ? ' ' + a.comment : '')
            );
        });

        if (o.type && o.type !== 'void') {
            commentSections.push('@returns ' + ('{' + createType(o.type) + '}') + (o.returnComment ? ' ' + o.returnComment : ''));
        }
    }

    if (commentSections.length === 0) {
        return '';
    }

    return '/**\n * ' + commentSections.join('\n * ') + '\n */\n';
};
