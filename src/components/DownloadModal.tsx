import { useState } from 'react';
import { 
  X, Download, Server, Code2, Check, FileArchive, 
  HelpCircle, ShieldCheck, ArrowRight, ExternalLink,
  FolderOpen, UploadCloud, CheckCircle2, AlertTriangle, Github
} from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [downloadedBuild, setDownloadedBuild] = useState(false);
  const [downloadedSource, setDownloadedSource] = useState(false);
  const [activeTab, setActiveTab] = useState<'direct' | 'github'>('direct');

  if (!isOpen) return null;

  return (
    <div
      id="download-zip-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] rounded-2xl sm:rounded-3xl overflow-hidden max-w-2xl w-full border border-[#D5E5D5] shadow-2xl relative my-auto max-h-[92dvh] sm:max-h-[88vh] flex flex-col animate-in zoom-in-95 duration-200 text-[#14361B]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0E2A14] text-white p-4 sm:p-6 relative border-b border-[#204E2B] shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close download modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1C4D25] text-white text-[11px] font-bold uppercase tracking-wider mb-1.5 border border-[#2D6A4F]">
            <Server className="w-3 h-3 text-[#95D5B2]" />
            <span>Hostinger Ready • Zero Setup</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-bold text-white pr-8">
            Deploy Website to Hostinger Server
          </h3>
          <p className="text-xs sm:text-sm text-[#B7E4C7] mt-0.5">
            Having trouble with GitHub? You do not need GitHub to upload to Hostinger!
          </p>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('direct')}
              className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === 'direct'
                  ? 'bg-[#52B788] text-[#0E2A14]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Direct File Manager (2 Min)</span>
            </button>

            <button
              onClick={() => setActiveTab('github')}
              className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === 'github'
                  ? 'bg-[#52B788] text-[#0E2A14]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>If Using GitHub</span>
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-contain">
          
          {/* TAB 1: DIRECT 1-CLICK HOSTINGER DOWNLOAD (Easiest) */}
          {activeTab === 'direct' && (
            <div className="space-y-4">
              
              {/* Highlight Banner */}
              <div className="bg-[#EDF7EE] rounded-xl p-3.5 border border-[#B7E4C7] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
                <div className="text-xs text-[#14361B]">
                  <strong className="block text-[#1C4D25] font-bold text-xs sm:text-sm mb-0.5">
                    No Git or GitHub Required!
                  </strong>
                  Download the compiled package below. It contains all HTML, CSS, JavaScript, and an optimized <code>.htaccess</code> file ready for Hostinger&apos;s <code>public_html</code>.
                </div>
              </div>

              {/* Main Download Card */}
              <div className="bg-[#F8FAF8] rounded-2xl p-4 sm:p-5 border-2 border-[#1C4D25] shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1C4D25] bg-[#D8F3DC] px-2 py-0.5 rounded">
                      Ready for public_html
                    </span>
                    <h4 className="text-base sm:text-lg font-display font-bold text-[#14361B] mt-1">
                      Hostinger Production Build ZIP
                    </h4>
                    <span className="text-xs font-mono text-[#2D6A4F]">
                      karamutsav-hostinger-build.zip
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#1C4D25] text-white flex items-center justify-center shrink-0">
                    <FileArchive className="w-5 h-5 text-[#95D5B2]" />
                  </div>
                </div>

                <p className="text-xs text-[#2E4F34] leading-relaxed">
                  Includes <code>index.html</code> (configured with relative asset paths), <code>.htaccess</code> (with Apache/LiteSpeed SPA fallback and Gzip compression), and all media assets.
                </p>

                <a
                  id="modal-download-build-btn"
                  href="/karamutsav-hostinger-build.zip"
                  download="karamutsav-hostinger-build.zip"
                  onClick={() => setDownloadedBuild(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1C4D25] hover:bg-[#14361B] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-[1.01]"
                >
                  {downloadedBuild ? (
                    <>
                      <Check className="w-4 h-4 text-[#95D5B2]" />
                      <span>Downloaded! Follow the 4 steps below &rarr;</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#95D5B2]" />
                      <span>Download Hostinger ZIP (1-Click)</span>
                    </>
                  )}
                </a>
              </div>

              {/* Simple 4-Step Visual Guide */}
              <div className="bg-[#F4F8F4] rounded-2xl p-4 sm:p-5 border border-[#D5E5D5] space-y-3">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-[#1C4D25] tracking-wider">
                  <FolderOpen className="w-4 h-4 text-[#2D6A4F]" />
                  <span>How to Upload to Hostinger in 2 Minutes:</span>
                </div>

                <div className="space-y-2.5 text-xs text-[#2E4F34]">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1C4D25] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong>Download:</strong> Click the button above to download <code>karamutsav-hostinger-build.zip</code> to your computer.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1C4D25] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong>Open Hostinger:</strong> Go to <a href="https://hpanel.hostinger.com" target="_blank" rel="noopener noreferrer" className="text-[#1C4D25] font-bold underline inline-flex items-center gap-0.5">hPanel <ExternalLink className="w-3 h-3" /></a> &rarr; <strong>Websites</strong> &rarr; <strong>File Manager</strong> &rarr; open <strong>public_html</strong>.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1C4D25] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong>Upload:</strong> Click the <strong>Upload</strong> icon (top-right of Hostinger File Manager) and upload <code>karamutsav-hostinger-build.zip</code>.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1C4D25] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong>Extract:</strong> Right-click the uploaded ZIP file, select <strong>Extract</strong>, select <code>public_html</code>, and click Extract.
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D5E5D5] text-[11px] text-[#2D6A4F] font-semibold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>That is all! Your website is live instantly at your domain name.</span>
                </div>
              </div>

              {/* Source Code Option (for developers) */}
              <div className="pt-1 flex items-center justify-between text-xs text-[#2E4F34]">
                <span>Want to edit the raw React/TypeScript source code?</span>
                <a
                  id="modal-download-source-link"
                  href="/karamutsav-full-source-code.zip"
                  download="karamutsav-full-source-code.zip"
                  onClick={() => setDownloadedSource(true)}
                  className="font-bold text-[#1C4D25] hover:underline inline-flex items-center gap-1"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{downloadedSource ? 'Downloaded' : 'Download Source ZIP'}</span>
                </a>
              </div>

            </div>
          )}

          {/* TAB 2: IF USING GITHUB */}
          {activeTab === 'github' && (
            <div className="space-y-4 text-xs">
              
              <div className="bg-[#FEF3C7] rounded-xl p-3.5 border border-[#FCD34D] flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                <div className="text-[#92400E]">
                  <strong className="block font-bold text-xs sm:text-sm mb-0.5">
                    Why did GitHub upload fail on Hostinger?
                  </strong>
                  Hostinger&apos;s standard shared hosting does <strong>NOT</strong> run <code>npm run build</code> on raw GitHub files. Browsers cannot run raw TypeScript/React files. They only run compiled HTML and JavaScript in <code>public_html</code>!
                </div>
              </div>

              <div className="bg-[#F8FAF8] rounded-2xl p-4 border border-[#D5E5D5] space-y-2.5">
                <h4 className="font-bold text-[#14361B] text-sm">
                  How to Fix GitHub with Hostinger:
                </h4>
                
                <p className="text-[#2E4F34]">
                  We have included an automated GitHub Action in this project:
                  <br />
                  <code className="bg-[#EDF4ED] px-2 py-0.5 rounded text-[11px] font-mono text-[#1C4D25]">
                    /.github/workflows/deploy-hostinger.yml
                  </code>
                </p>

                <ol className="list-decimal list-inside space-y-1 text-[#2E4F34]">
                  <li>Push this repository to your GitHub account.</li>
                  <li>In Hostinger hPanel, go to <strong>Files &rarr; FTP Accounts</strong>.</li>
                  <li>In your GitHub Repo, go to <strong>Settings &rarr; Secrets &rarr; Actions</strong>.</li>
                  <li>Add <code>HOSTINGER_FTP_SERVER</code>, <code>HOSTINGER_FTP_USERNAME</code>, and <code>HOSTINGER_FTP_PASSWORD</code>.</li>
                  <li>GitHub will automatically build and deploy every time you push code!</li>
                </ol>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('direct')}
                  className="px-4 py-2 rounded-xl bg-[#1C4D25] text-white font-bold text-xs cursor-pointer hover:bg-[#14361B]"
                >
                  &larr; Switch to Easy 1-Click Upload (No GitHub)
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#F4F8F4] p-3 sm:p-4 border-t border-[#D5E5D5] flex items-center justify-between text-xs text-[#4D7C55] shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
            <span>Apache &amp; LiteSpeed Tested</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-[#D5E5D5] text-[#14361B] font-semibold hover:bg-gray-100 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
