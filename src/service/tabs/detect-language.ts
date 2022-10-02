import { toLower } from 'ramda';
import { tabs } from './tabs';
import { chsTypes, chtTypes, ZhType } from './tabs.constant';

const langToZhtype = (lang: string): ZhType =>
  chsTypes.find(tag => tag === lang) ? ZhType.hans : chtTypes.find(tag => tag === lang) ? ZhType.hant : ZhType.und;

export const detectLanguage = (tabId?: number): Promise<ZhType> => {
  try {
    return (
      tabs
        .detectLanguage(tabId)
        .then(toLower)
        .then(langToZhtype)
        // INFO: some browsers may fail with detect language api
        .catch(() => ZhType.und)
    );
  } catch (e) {
    return Promise.resolve(ZhType.und);
  }
};
