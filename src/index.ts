import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

interface IConfig {
  locale?: string;
}

interface ILanguagePack {
  [key: string]: string;
}

export class Localize {
  private bundle: ILanguagePack;
  private extensionPath: string;
  constructor(private options: IConfig = {}) {}
  /**
   * translate the key
   * @param key
   * @param args
   */
  public localize(key: string, ...args: string[]): string {
    const languagePack = this.bundle;
    const message: string = languagePack[key] || key;
    return this.format(message, args);
  }
  public init(extensionPath: string) {
    this.extensionPath = extensionPath;
    this.bundle = this.resolveLanguagePack();
  }
  private format(message: string, args: string[] = []): string {
    let result: string;
    if (args.length === 0) {
      result = message;
    } else {
      result = message.replace(/\{(\d+)\}/g, (match, rest: any[]) => {
        const index = rest[0];
        return typeof args[index] !== "undefined" ? args[index] : match;
      });
    }
    return result;
  }
  private resolveLanguagePack(): ILanguagePack {
    const defaultResolvedLanguage = ".nls.json";
    let resolvedLanguage: string = "";
    const rootPath = this.extensionPath || process.cwd();
    const file = path.join(rootPath, "package");
    const options = this.options;

    if (!options.locale) {
      resolvedLanguage = defaultResolvedLanguage;
    } else {
      let locale: string | null = options.locale;
      while (locale) {
        const candidate = ".nls." + locale + ".json";
        if (fs.existsSync(file + candidate)) {
          resolvedLanguage = candidate;
          break;
        } else {
          const index = locale.lastIndexOf("-");
          if (index > 0) {
            locale = locale.substring(0, index);
          } else {
            resolvedLanguage = ".nls.json";
            locale = null;
          }
        }
      }
    }

    let defaultLanguageBundle = {};

    // if not use default language
    // then merger the Language pack
    // just in case the resolveLanguage bundle missing the translation and fallback with default language
    if (resolvedLanguage !== defaultResolvedLanguage) {
      defaultLanguageBundle = JSON.parse(fs.readFileSync(path.join(file + defaultResolvedLanguage), "utf8"));
    }

    const languageFilePath = path.join(file + resolvedLanguage);

    const isExistResolvedLanguage = fs.existsSync(languageFilePath);

    const ResolvedLanguageBundle = isExistResolvedLanguage ? JSON.parse(fs.readFileSync(languageFilePath, "utf8")) : {};

    // merger with default language bundle
    return { ...defaultLanguageBundle, ...ResolvedLanguageBundle };
  }
}

const config: IConfig = {
  locale: vscode.env.language,
};

const instance = new Localize(config);

export const init = instance.init.bind(instance) as typeof instance.init;

export const localize = instance.localize.bind(instance) as typeof instance.localize;
