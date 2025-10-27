"use client"

export default function AnimatedWaves(){
    return(
        <div className="wave pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#0b0b0c]">
            <div className="flex w-[200vw] animate-wave-slide">
                <WaveSVG className="flex w-[100vw] h-screen shrink-0"/>
                <WaveSVG className="flex w-[100vw] h-screen shrink-0"/>

            </div>
        </div>
    )
}

function WaveSVG({ className = "" }: { className?: string }){
    return(
        <svg className={className}
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true">
            <rect width="1440" height="900" fill="#625834" />
            <path
                d="
                M1440,0
                L1100,0
                C1050,140 1080,220 1020,330
                C960,440 1060,520 1000,630
                C940,740 1050,820 1100,900
                L1440,900 Z
                "
                fill="#C5D86D"
            />
            <path
                d="
                M1440,0
                L1300,0
                C1260,140 1340,240 1280,350
                C1220,460 1340,560 1280,680
                C1220,800 1280,870 1300,900
                L1440,900 Z
                "
                fill="#e17323"
                opacity="0.95"
            />
            <defs>
                <radialGradient id="vignette" cx="25%" cy="55%" r="75%">
                <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
                </radialGradient>
            </defs>
            <rect width="1440" height="900" fill="url(#vignette)" />
        </svg>
    )

}