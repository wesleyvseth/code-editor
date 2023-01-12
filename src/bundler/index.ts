import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from './plugins/fetch-plugin';

interface BundledResult {
    code: string,
    bundleErr: any,
};

let service: esbuild.Service;

const bundle = async (
    rawCode: string,
): Promise<BundledResult> =>  {
    if(!service) {
        service = await esbuild.startService(
            {
                worker: true,
                wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
            },
        );
    }

    try {
        const builtCode = await service.build(
            {
                entryPoints: [
                    'index.js',
                ],
                bundle: true,
                write: false,
                plugins: [
                    unpkgPathPlugin(),
                    fetchPlugin(
                        rawCode
                    )
                ],
                define: {
                    'process.env.NODE_ENV': '"production"',
                    global: 'window'
                },
            },
        );

        return {
            code: builtCode.outputFiles[0].text,
            bundleErr: '',
        }
    } catch(err: any) {
        return {
            code: '',
            bundleErr: err.message,
        };
    }

}

export default bundle;