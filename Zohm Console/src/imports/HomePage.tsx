import svgPaths from "./svg-3ppr2pbcfw";
import clsx from "clsx";
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[16px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px">{children}</p>
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={clsx("h-[16px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type NavItemBackgroundImageProps = {
  additionalClassNames?: string;
};

function NavItemBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<NavItemBackgroundImageProps>) {
  return (
    <div className={clsx("h-[36px] relative rounded-[4px] shrink-0 w-full", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] pr-0 py-0 relative size-full">{children}</div>
      </div>
    </div>
  );
}

function IconBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type ContainerBackgroundImageAndText1Props = {
  text: string;
};

function ContainerBackgroundImageAndText1({ text }: ContainerBackgroundImageAndText1Props) {
  return (
    <div className="h-[16px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#fb2c36] text-[12px] text-nowrap top-px">{text}</p>
    </div>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
};

function ContainerBackgroundImageAndText({ text }: ContainerBackgroundImageAndTextProps) {
  return (
    <div className="h-[32px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-0 not-italic text-[#9ae600] text-[24px] text-nowrap top-0 tracking-[0.0703px]">{text}</p>
    </div>
  );
}
type BackgroundImageAndText2Props = {
  text: string;
};

function BackgroundImageAndText2({ text }: BackgroundImageAndText2Props) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px]">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText({ text, additionalClassNames = "" }: TextBackgroundImageAndTextProps) {
  return (
    <div className={clsx("h-[20px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#9f9fa9] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px]">{text}</p>
      </div>
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
};

function BackgroundImageAndText1({ text }: BackgroundImageAndText1Props) {
  return (
    <div className="h-[16px] relative shrink-0 w-full">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#71717b] text-[12px] text-nowrap top-px">{text}</p>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return <BackgroundImage1>{text}</BackgroundImage1>;
}

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[133.242px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#9f9fa9] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px]">Zo House Console</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <BackgroundImage additionalClassNames="w-[10.875px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#9f9fa9] text-[12px] text-nowrap top-px">→</p>
    </BackgroundImage>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Icon() {
  return (
    <IconBackgroundImage>
      <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, #D4D4D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #D4D4D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d4d4d8] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px]">Quick Search</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <BackgroundImage additionalClassNames="w-[33.242px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#71717b] text-[12px] text-nowrap top-px">⌘ + K</p>
    </BackgroundImage>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Text2 />
      <Text3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[93px] relative shrink-0 w-[255px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#27272a] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <IconBackgroundImage>
      <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <TextBackgroundImageAndText text="Zo Console" additionalClassNames="w-[73.367px]" />
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <IconBackgroundImage>
      <path d={svgPaths.p3a151200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p1ecd1680} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.242px]" data-name="Text">
      <BackgroundImageAndText2 text="Dashboard" />
    </div>
  );
}

function NavItem() {
  return (
    <NavItemBackgroundImage additionalClassNames="bg-[#27272a]">
      <Icon2 />
      <Text4 />
    </NavItemBackgroundImage>
  );
}

function Icon3() {
  return (
    <IconBackgroundImage>
      <path d="M6.66667 8H9.33333" id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M6.66667 5.33333H9.33333" id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p35fdc80} id="Vector_3" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p91828dc} id="Vector_4" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p2af3f500} id="Vector_5" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function NavItem1() {
  return (
    <NavItemBackgroundImage>
      <Icon3 />
      <TextBackgroundImageAndText text="Profitability" additionalClassNames="w-[69.398px]" />
    </NavItemBackgroundImage>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage>
      <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function NavItem2() {
  return (
    <NavItemBackgroundImage>
      <Icon4 />
      <TextBackgroundImageAndText text="Crew" additionalClassNames="w-[103.102px]" />
    </NavItemBackgroundImage>
  );
}

function Icon5() {
  return (
    <IconBackgroundImage>
      <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p3b6ee540} id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function NavItem3() {
  return (
    <NavItemBackgroundImage>
      <Icon5 />
      <TextBackgroundImageAndText text="Captains Deck" additionalClassNames="w-[48.258px]" />
    </NavItemBackgroundImage>
  );
}

function Icon6() {
  return (
    <IconBackgroundImage>
      <path d="M8 4.66667V14" id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p8c8fb00} id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function NavItem4() {
  return (
    <NavItemBackgroundImage>
      <Icon6 />
      <TextBackgroundImageAndText text="Vibe Curation" additionalClassNames="w-[59.633px]" />
    </NavItemBackgroundImage>
  );
}

function Icon7() {
  return (
    <IconBackgroundImage>
      <path d="M2 3.33333H2.00667" id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 8H2.00667" id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 12.6667H2.00667" id="Vector_3" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M5.33333 3.33333H14" id="Vector_4" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M5.33333 8H14" id="Vector_5" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M5.33333 12.6667H14" id="Vector_6" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function NavItem5() {
  return (
    <NavItemBackgroundImage>
      <Icon7 />
      <TextBackgroundImageAndText text="Cafe" additionalClassNames="w-[52.672px]" />
    </NavItemBackgroundImage>
  );
}

function Icon8() {
  return (
    <IconBackgroundImage>
      <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 6H14" id="Vector_2" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 10H14" id="Vector_3" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M6 2V14" id="Vector_4" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M10 2V14" id="Vector_5" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function NavItem6() {
  return (
    <NavItemBackgroundImage>
      <Icon8 />
      <TextBackgroundImageAndText text="Portals" additionalClassNames="w-[65.406px]" />
    </NavItemBackgroundImage>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[276px] items-start relative shrink-0 w-full" data-name="Container">
      <NavItem />
      <NavItem1 />
      <NavItem2 />
      <NavItem3 />
      <NavItem4 />
      <NavItem5 />
      <NavItem6 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[255px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pb-0 pt-[16px] px-[16px] relative size-full">
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <BackgroundImage additionalClassNames="w-[15.586px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[12px] text-nowrap text-white top-px">SZ</p>
    </BackgroundImage>
  );
}

function Container5() {
  return (
    <div className="relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(5, 223, 114) 0%, rgb(43, 127, 255) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.008px] py-0 relative size-full">
        <Text5 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px]">samurai.zo</p>
    </div>
  );
}

function Container7() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[36px]">
      <Container6 />
      <BackgroundImageAndText1 text="Admin" />
    </ContainerBackgroundImage>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[12px] h-[36px] items-center relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[69px] relative shrink-0 w-[255px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#27272a] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[17px] px-[16px] relative size-full">
        <Container8 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#09090b] h-[631px] relative shrink-0 w-[256px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#27272a] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-0 pr-px py-0 relative size-full">
        <Container2 />
        <Navigation />
        <Container9 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[32px] relative shrink-0 w-[96.055px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[32px] left-0 not-italic text-[24px] text-nowrap text-white top-0 tracking-[0.0703px]">Zohm</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <BackgroundImageAndText2 text="Today" />
    </div>
  );
}

function Icon9() {
  return (
    <IconBackgroundImage>
      <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage>
  );
}

function Container10() {
  return (
    <div className="bg-[#18181b] h-[38px] relative rounded-[4px] shrink-0 w-[96.68px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[17px] py-px relative size-full">
        <Text6 />
        <Icon9 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[38px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container10 />
    </div>
  );
}

function Header() {
  return (
    <div className="h-[71px] relative shrink-0 w-[845px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#27272a] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[16px] px-[24px] relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function StatCard() {
  return (
    <div className="absolute bg-[#09090b] content-stretch flex flex-col gap-[8px] h-[110px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[10px] top-0 w-[249.664px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <BackgroundImageAndText text="Total Bookings" />
      <ContainerBackgroundImageAndText text="2118" />
      <ContainerBackgroundImageAndText1 text="-583" />
    </div>
  );
}

function StatCard1() {
  return (
    <div className="absolute bg-[#09090b] content-stretch flex flex-col gap-[8px] h-[110px] items-start left-[273.66px] pb-px pt-[17px] px-[17px] rounded-[10px] top-0 w-[249.664px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <BackgroundImageAndText text="GBV" />
      <ContainerBackgroundImageAndText text="₹70.53L" />
      <ContainerBackgroundImageAndText1 text="-₹21.15L" />
    </div>
  );
}

function StatCard2() {
  return (
    <div className="absolute bg-[#09090b] content-stretch flex flex-col gap-[8px] h-[110px] items-start left-[547.33px] pb-px pt-[17px] px-[17px] rounded-[10px] top-0 w-[249.672px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <BackgroundImageAndText text="Cities" />
      <ContainerBackgroundImageAndText text="1" />
      <ContainerBackgroundImageAndText1 text="4 inactive" />
    </div>
  );
}

function Container12() {
  return <BackgroundImage1>{`Zo Houses `}</BackgroundImage1>;
}

function StatCard3() {
  return (
    <div className="absolute bg-[#09090b] content-stretch flex flex-col gap-[8px] h-[110px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[10px] top-[134px] w-[249.664px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container12 />
      <ContainerBackgroundImageAndText text="2" />
      <ContainerBackgroundImageAndText1 text="4 inactive" />
    </div>
  );
}

function StatCard4() {
  return (
    <div className="absolute bg-[#09090b] content-stretch flex flex-col gap-[8px] h-[110px] items-start left-[273.66px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[134px] w-[249.664px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <BackgroundImageAndText text="Citizens" />
      <ContainerBackgroundImageAndText text="5,14,155" />
      <BackgroundImageAndText1 text="15,51,228 shadow users" />
    </div>
  );
}

function StatCard5() {
  return (
    <div className="absolute bg-[#09090b] content-stretch flex flex-col gap-[8px] h-[110px] items-start left-[547.33px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[134px] w-[249.672px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <BackgroundImageAndText text="Nodes" />
      <ContainerBackgroundImageAndText text="22/344" />
      <ContainerBackgroundImageAndText1 text="308 pending • 14 rejected" />
    </div>
  );
}

function StatCard6() {
  return (
    <div className="absolute bg-[#09090b] content-stretch flex flex-col gap-[8px] h-[110px] items-start left-[273.66px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[268px] w-[249.664px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <BackgroundImageAndText text="Events" />
      <ContainerBackgroundImageAndText text="0/0" />
      <ContainerBackgroundImageAndText1 text="0 inactive" />
    </div>
  );
}

function StatCard7() {
  return (
    <div className="absolute bg-[#09090b] content-stretch flex flex-col gap-[8px] h-[110px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[10px] top-[270px] w-[249.664px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <BackgroundImageAndText text="POA" />
      <ContainerBackgroundImageAndText text="0/0" />
      <ContainerBackgroundImageAndText1 text="0 inactive • 0 expired" />
    </div>
  );
}

function StatCard8() {
  return (
    <div className="absolute bg-[#09090b] content-stretch flex flex-col gap-[8px] h-[110px] items-start left-[547px] pb-px pt-[17px] px-[17px] rounded-[10px] top-[268px] w-[249.664px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <BackgroundImageAndText text="Portals" />
      <ContainerBackgroundImageAndText text="0/0" />
      <ContainerBackgroundImageAndText1 text="0 inactive" />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-0 not-italic text-[#f0b100] text-[24px] text-nowrap top-0 tracking-[0.0703px]">0.0 (0)</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#f0b100] text-[12px] text-nowrap top-px">0.0</p>
    </div>
  );
}

function StatCard9() {
  return (
    <div className="absolute bg-[#09090b] content-stretch flex flex-col gap-[8px] h-[110px] items-start left-0 pb-px pt-[17px] px-[17px] rounded-[10px] top-[536px] w-[249.664px]" data-name="StatCard">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <BackgroundImageAndText text="Rating" />
      <Container13 />
      <Container14 />
    </div>
  );
}

function StatsGrid() {
  return (
    <div className="h-[498px] relative shrink-0 w-[821px]" data-name="StatsGrid">
      <StatCard />
      <StatCard1 />
      <StatCard2 />
      <StatCard3 />
      <StatCard4 />
      <StatCard5 />
      <StatCard6 />
      <StatCard7 />
      <StatCard8 />
      <StatCard9 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[845px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-0 pt-[24px] px-[24px] relative rounded-[inherit] size-full">
        <StatsGrid />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[631px]">
      <Header />
      <MainContent />
    </ContainerBackgroundImage>
  );
}

export default function HomePage() {
  return (
    <div className="bg-black content-stretch flex items-start relative size-full" data-name="Home page">
      <Sidebar />
      <Container15 />
    </div>
  );
}
