import { Matches } from "./matches";
import { PredicateGenerator } from "./predicate-generator";

export enum ProxyMode {
    ProxyAlways = 'proxyAlways',
    ProxyOnce = 'proxyOnce',
    ProxyTransparent = 'proxyTransparent',
}

export class Proxy {
    to: string;
    mode?: ProxyMode = undefined;
    predicateGenerators?: PredicateGenerator[] = undefined;

    constructor(to: string) {
        this.to = to;
        this.predicateGenerators = [];
    }

    withMode(mode: ProxyMode): Proxy {
        this.mode = mode;
        return this;
    }

    withPredicateGenerator(generator: PredicateGenerator): Proxy {
        this.predicateGenerators?.push(generator);
        return this;
    }

    toJSON(): any {
        var proxy: any = {};

        proxy.to = this.to;
        if (this.mode) {
            proxy.mode = this.mode;
        }

        if (this.predicateGenerators) {
            proxy.predicateGenerators = [{
                "matches": {
                    "method": true,
                    "path": true,
                    "query": true,
                    "body": true
                }
            }]
        }
        return { proxy: proxy };
    }
}

export class DebugProxy extends Proxy {
    constructor(to: string) {
        super(to);
        this
            .withMode(ProxyMode.ProxyAlways)
            .withPredicateGenerator(new PredicateGenerator().withMatches(new Matches()));
    }
}
