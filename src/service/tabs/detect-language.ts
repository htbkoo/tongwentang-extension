import { toLower } from 'ramda';
import { tabs } from './tabs';
import { chsTypes, chtTypes, ZhType } from './tabs.constant';

const langToZhtype = (lang: string): ZhType =>
  chsTypes.find(tag => tag === lang) ? ZhType.hans : chtTypes.find(tag => tag === lang) ? ZhType.hant : ZhType.und;

export const detectLanguage = async (tabId?: number): Promise<ZhType> => {
  try {
    const lang = await tabs.detectLanguage(tabId);
    return langToZhtype(toLower(lang));
  } catch (e) {
    // INFO: some browsers may fail with detect language api
    return ZhType.und;
  }
};
