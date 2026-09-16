import { useState } from 'react';
import { X, Download, Server, Code2, Check, FileArchive, Coffee, HelpCircle } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [downloadedBuild, setDownloadedBuild] = useState(false);
  const [downloadedSource, setDownloadedSource] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      id="download-zip-modal"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] rounded-3xl overflow-hidden max-w-2xl w-full border border-[#D5E5D5] shadow-2xl relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header in Tea Garden Theme */}
        <div className="bg-[#0E2A14] text-[#FFF9F5] p-6 sm:p-7 relative border-b border-[#204E2B]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close download modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C4D25] text-white text-xs font-bold uppercase tracking-wider mb-2 border border-[#2D6A4F]">
            <FileArchive className="w-3.5 h-3.5 text-[#95D5B2]" />
            <span>Download Website ZIP Archives</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Download Karam Utsav Website
          </h3>
          <p className="text-xs sm:text-sm text-[#B7E4C7] mt-1">
            Choose whether you want the ready-to-upload Hostinger live package or the complete source code.
          </p>
        </div>

        {/* Options Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Option 1: Hostinger Live Production Build */}
            <div className="bg-[#F4F8F4] rounded-2xl p-5 sm:p-6 border-2 border-[#2D6A4F]/40 flex flex-col justify-between hover:border-[#1C4D25] transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#1C4D25] text-white flex items-center justify-center shadow-sm">
                  <Server className="w-6 h-6 text-[#95D5B2]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C4D25] bg-[#D8F3DC] px-2 py-0.5 rounded">
                    Recommended for Hostinger
                  </span>
                  <h4 className="text-lg font-display font-bold text-[#14361B] mt-1.5">
                    Production Build ZIP
                  </h4>
                  <div className="text-xs text-[#2D6A4F] font-mono mt-0.5">
                    karamutsav-hostinger-build.zip
                  </div>
                </div>
                <p className="text-xs text-[#2E4F34] leading-relaxed">
                  Contains all compiled HTML, CSS, JavaScript, image assets, and <strong>.htaccess</strong> for Hostinger's Apache/OpenLiteSpeed public_html.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#D5E5D5]">
                <a
                  id="modal-download-build-btn"
                  href="/karamutsav-hostinger-build.zip"
                  download="karamutsav-hostinger-build.zip"
                  onClick={() => setDownloadedBuild(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1C4D25] hover:bg-[#14361B] text-white font-bold text-xs shadow transition-all cursor-pointer hover:scale-[1.02]"
                >
                  {downloadedBuild ? (
                    <>
                      <Check className="w-4 h-4 text-[#95D5B2]" />
                      <span>Downloaded! (Ready)</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#95D5B2]" />
                      <span>Download Hostinger ZIP</span>
                    </>
                  )}
                </a>
              </div>
            </div>

            {/* Option 2: Full Source Code */}
            <div className="bg-[#F4F8F4] rounded-2xl p-5 sm:p-6 border border-[#D5E5D5] flex flex-col justify-between hover:border-[#1C4D25] transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center shadow-sm">
                  <Code2 className="w-6 h-6 text-[#D8F3DC]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2D6A4F] bg-[#E1EDE1] px-2 py-0.5 rounded">
                    Developer Package
                  </span>
                  <h4 className="text-lg font-display font-bold text-[#14361B] mt-1.5">
                    Full Source Code ZIP
                  </h4>
                  <div className="text-xs text-[#2D6A4F] font-mono mt-0.5">
                    karamutsav-full-source-code.zip
                  </div>
                </div>
                <p className="text-xs text-[#2E4F34] leading-relaxed">
                  Includes all TypeScript code, React components, Tailwind config, audio synthesizer, and package.json to run with <code>npm run dev</code>.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#D5E5D5]">
                <a
                  id="modal-download-source-btn"
                  href="/karamutsav-full-source-code.zip"
                  download="karamutsav-full-source-code.zip"
                  onClick={() => setDownloadedSource(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2D6A4F] hover:bg-[#1C4D25] text-white font-bold text-xs shadow-sm transition-all cursor-pointer hover:scale-[1.02]"
                >
                  {downloadedSource ? (
                    <>
                      <Check className="w-4 h-4 text-[#95D5B2]" />
                      <span>Downloaded! (Ready)</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#95D5B2]" />
                      <span>Download Source Code ZIP</span>
                    </>
                  )}
                </a>
              </div>
            </div>

          </div>

          {/* Quick 3-Step Hostinger Instructions */}
          <div className="bg-[#EDF4ED] rounded-2xl p-4 sm:p-5 border border-[#D5E5D5] space-y-2 text-xs text-[#14361B]">
            <div className="flex items-center gap-1.5 font-bold uppercase text-[#1C4D25] tracking-wider">
              <HelpCircle className="w-4 h-4 text-[#2D6A4F]" />
              <span>How to Upload to Hostinger:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[#2E4F34] leading-relaxed">
              <li>Download the <strong>Production Build ZIP</strong> above.</li>
              <li>Log in to <strong>Hostinger hPanel</strong> &rarr; <strong>File Manager</strong> &rarr; open <code>public_html</code>.</li>
              <li>Upload the ZIP file, right click and choose <strong>Extract</strong> directly inside <code>public_html</code>.</li>
            </ol>
          </div>

        </div>

      </div>
    </div>
  );
}
