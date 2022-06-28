import { onMounted, onUnmounted, ref } from 'vue';
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { langs, CodeLangs, mapTemplate } from '@/utils/option';
// https://github.com/vitejs/vite/discussions/1791
// https://juejin.cn/post/6933463466111926286

// @ts-ignore: monaco vite下执行，解决环境冲突
self.MonacoEnvironment = {
    getWorker(_: any, label: string) {
        if (label === 'json') {
            return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
        }
        return new editorWorker()
    }
}

export const useCreateEditor = ({
    refEditorEl,
    langType
}: {
    refEditorEl: any,
    langType?: number
}) => {
    const refLang = ref(langType ?? CodeLangs.python);
    let instance: any = null;
    let model: any = null;

    const disposeEditor = () => {
        model?.dispose?.();
        instance?.dispose?.();
    }

    const createEditor = () => {
        disposeEditor()
        if (refEditorEl.value) {
            instance = monaco.editor.create(refEditorEl.value, {
                language: CodeLangs[refLang.value],
                value: mapTemplate.get(CodeLangs[refLang.value]),
                foldingStrategy: 'indentation', // 代码可分小段折叠
                tabSize: 2,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                theme: 'vs-dark',
            });
        }
    }

    const changeLang = (type: number) => {
        refLang.value = type ?? CodeLangs.python;
        createEditor()
    }

    onMounted(() => {
        createEditor()
    })

    onUnmounted(() => {
        disposeEditor?.()
    })

    return {
        changeLang,
        getValue: () => instance?.getValue?.()
    }
}


