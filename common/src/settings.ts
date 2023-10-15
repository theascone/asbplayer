import { AutoPausePreference } from './model';

export interface SharedGlobalSettings {
    readonly themeType: 'dark' | 'light';
    readonly language: string;
}

export interface MiscSettings extends SharedGlobalSettings {
    readonly themeType: 'dark' | 'light';
    readonly copyToClipboardOnMine: boolean;
    readonly autoPausePreference: AutoPausePreference;
    readonly keyBindSet: KeyBindSet;
    readonly rememberSubtitleOffset: boolean;
    readonly autoCopyCurrentSubtitle: boolean;
    readonly subtitleRegexFilter: string;
    readonly subtitleRegexFilterTextReplacement: string;
    readonly miningHistoryStorageLimit: number;
    readonly preCacheSubtitleDom: boolean;
}

export interface AnkiSettings {
    readonly ankiConnectUrl: string;
    readonly deck: string;
    readonly noteType: string;
    readonly sentenceField: string;
    readonly definitionField: string;
    readonly audioField: string;
    readonly imageField: string;
    readonly wordField: string;
    readonly sourceField: string;
    readonly urlField: string;
    readonly customAnkiFields: { [key: string]: string };
    readonly tags: string[];
    readonly preferMp3: boolean;
    readonly audioPaddingStart: number;
    readonly audioPaddingEnd: number;
    readonly maxImageWidth: number;
    readonly maxImageHeight: number;
    readonly surroundingSubtitlesCountRadius: number;
    readonly surroundingSubtitlesTimeRadius: number;
}

export interface CustomStyle {
    readonly key: string;
    readonly value: string;
}

export interface TextSubtitleSettings {
    readonly subtitleColor: string;
    readonly subtitleSize: number;
    readonly subtitleThickness: number;
    readonly subtitleOutlineThickness: number;
    readonly subtitleOutlineColor: string;
    readonly subtitleBackgroundOpacity: number;
    readonly subtitleBackgroundColor: string;
    readonly subtitleFontFamily: string;
    readonly subtitleCustomStyles: CustomStyle[];
}

export interface SubtitleSettings extends TextSubtitleSettings {
    readonly imageBasedSubtitleScaleFactor: number;
}

export interface KeyBind {
    readonly keys: string;
}

export interface KeyBindSet {
    readonly togglePlay: KeyBind;
    readonly toggleAutoPause: KeyBind;
    readonly toggleCondensedPlayback: KeyBind;
    readonly toggleSubtitles: KeyBind;
    readonly toggleVideoSubtitleTrack1: KeyBind;
    readonly toggleVideoSubtitleTrack2: KeyBind;
    readonly toggleAsbplayerSubtitleTrack1: KeyBind;
    readonly toggleAsbplayerSubtitleTrack2: KeyBind;
    readonly seekBackward: KeyBind;
    readonly seekForward: KeyBind;
    readonly seekToPreviousSubtitle: KeyBind;
    readonly seekToNextSubtitle: KeyBind;
    readonly seekToBeginningOfCurrentSubtitle: KeyBind;
    readonly adjustOffsetToPreviousSubtitle: KeyBind;
    readonly adjustOffsetToNextSubtitle: KeyBind;
    readonly decreaseOffset: KeyBind;
    readonly increaseOffset: KeyBind;
    readonly resetOffset: KeyBind;
    readonly decreasePlaybackRate: KeyBind;
    readonly increasePlaybackRate: KeyBind;

    // Bound from Chrome if extension is installed
    readonly copySubtitle: KeyBind;
    readonly ankiExport: KeyBind;
    readonly updateLastCard: KeyBind;
    readonly takeScreenshot: KeyBind;
}

export type ChromeBoundKeyBindName = 'copySubtitle' | 'ankiExport' | 'updateLastCard' | 'takeScreenshot';
export type SubtitleAlignment = 'top' | 'bottom';
export enum SubtitleListPreference {
    noSubtitleList = 'noSubtitleList',
    app = 'app',
}

export interface StreamingVideoSettings {
    readonly streamingDisplaySubtitles: boolean;
    readonly streamingRecordMedia: boolean;
    readonly streamingTakeScreenshot: boolean;
    readonly streamingCleanScreenshot: boolean;
    readonly streamingCropScreenshot: boolean;
    readonly streamingSubsDragAndDrop: boolean;
    readonly streamingAutoSync: boolean;
    // Last language selected in subtitle track selector, keyed by domain
    // Used to auto-selecting a language in subtitle track selector, if it's available
    readonly streamingLastLanguagesSynced: { [key: string]: string };
    readonly streamingSubtitlePositionOffset: number;
    readonly streamingCondensedPlaybackMinimumSkipIntervalMs: number;
    readonly streamingScreenshotDelay: number;
    readonly streamingSubtitleAlignment: SubtitleAlignment;
    readonly streamingSubtitleListPreference: SubtitleListPreference;
}

export type KeyBindName = keyof KeyBindSet;

export interface AsbplayerSettings extends MiscSettings, AnkiSettings, SubtitleSettings, StreamingVideoSettings {
    readonly subtitlePreview: string;
}

const keyBindNameMap: any = {
    'copy-subtitle': 'copySubtitle',
    'copy-subtitle-with-dialog': 'ankiExport',
    'update-last-card': 'updateLastCard',
    'take-screenshot': 'takeScreenshot',
};

export function chromeCommandBindsToKeyBinds(chromeCommands: { [key: string]: string | undefined }) {
    const keyBinds: { [key: string]: string | undefined } = {};

    for (const commandName of Object.keys(chromeCommands)) {
        keyBinds[keyBindNameMap[commandName]] = chromeCommands[commandName];
    }

    return keyBinds;
}
