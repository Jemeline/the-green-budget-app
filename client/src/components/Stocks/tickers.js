const tickers = [
    {company: "Exxon Mobil, XOM"},
    {company: "Apple, AAPL"},
    {company: "Berkshire Hathaway, BRK.B"},
    {company: "McKesson, MCK"},
    {company: "UnitedHealth Group, UNH"},
    {company: "CVS Health, CVS"},
    {company: "General Motors, GM"},
    {company: "Ford Motor, F"},
    {company: "AT&T, T"},
    {company: "General Electric, GE"},
    {company: "AmerisourceBergen, ABC"},
    {company: "Verizon, VZ"},
    {company: "Chevron, CVX"},
    {company: "Costco, COST"},
    {company: "Fannie Mae, FNMA"},
    {company: "Kroger, KR"},
    {company: "Amazon.com, AMZN"},
    {company: "Walgreens, WAG"},
    {company: "HP, HPQ"},
    {company: "Cardinal Health, CAH"},
    {company: "Express Scripts Holding, ESRX"},
    {company: "J.P. Morgan Chase, JPM"},
    {company: "Boeing, BA"},
    {company: "Microsoft, MSFT"},
    {company: "Bank of America Corp., BAC"},
    {company: "Wells Fargo, WFC"},
    {company: "Home Depot, HD"},
    {company: "Citigroup, C"},
    {company: "Phillips 66, PSX"},
    {company: "IBM, IBM"},
    {company: "Valero Energy, VLO"},
    {company: "Anthem, ANTM"},
    {company: "Procter & Gamble, PG"},
    {company: "State Farm Insurance Cos., STFGX"},
    {company: "Google, GOOGL"},
    {company: "Comcast, CMCSA"},
    {company: "Target, TGT"},
    {company: "Johnson & Johnson, JNJ"},
    {company: "MetLife, MET"},
    {company: "Archer Daniels Midland, ADM"},
    {company: "Marathon Petroleum, MPC"},
    {company: "Freddie Mac, FMCC"},
    {company: "PepsiCo, PEP"},
    {company: "United Technologies, UTX"},
    {company: "Aetna, AET"},
    {company: "Lowe's, LOW"},
    {company: "UPS, UPS"},
    {company: "AIG, AIG"},
    {company: "Prudential Financial, PRU"},
    {company: "Intel, INTC"},
    {company: "Humana, HUM"},
    {company: "Disney, DIS"},
    {company: "Cisco Systems, CSCO"},
    {company: "Pfizer, PFE"},
    {company: "Dow Chemical, DOW"},
    {company: "Sysco, SYY"},
    {company: "FedEx, FDX"},
    {company: "Caterpillar, CAT"},
    {company: "Lockheed Martin, LMT"},
    {company: "New York Life Insurance, "},
    {company: "Coca-Cola, KO"},
    {company: "HCA Holdings, HCA"},
    {company: "Ingram Micro, IM"},
    {company: "Energy Transfer Equity, ETE"},
    {company: "Tyson Foods, TSN"},
    {company: "American Airlines Group, AAL"},
    {company: "Delta Air Lines, DAL"},
    {company: "Nationwide, "},
    {company: "Johnson Controls, JCI"},
    {company: "Best Buy, BBY"},
    {company: "Merck, MRK"},
    {company: "Liberty Mutual Insurance Group, "},
    {company: "Goldman Sachs Group, GS"},
    {company: "Honeywell International, HON"},
    {company: "Massachusetts Mutual Life Insurance, "},
    {company: "Oracle, ORCL"},
    {company: "Morgan Stanley, MS"},
    {company: "Cigna, CI"},
    {company: "United Continental Holdings, UAL"},
    {company: "Allstate, ALL"},
    {company: "TIAA, "},
    {company: "INTL FCStone, INTL"},
    {company: "CHS, CHS"},
    {company: "American Express, AXP"},
    {company: "Gilead Sciences, GILD"},
    {company: "Publix Super Markets, "},
    {company: "General Dynamics, GD"},
    {company: "TJX, TJX"},
    {company: "ConocoPhillips, COP"},
    {company: "Nike, NKE"},
    {company: "World Fuel Services, INT"},
    {company: "3M, MMM"},
    {company: "Mondelez International, MDLZ"},
    {company: "Exelon, EXC"},
    {company: "Twenty-First Century Fox, FOXA"},
    {company: "Deere, DE"},
    {company: "Tesoro, TSO"},
    {company: "Time Warner, TWX"},
    {company: "Northwestern Mutual, "},
    {company: "DuPont, DD"},
    {company: "Avnet, AVT"},
    {company: "Macy's, M"},
    {company: "Enterprise Products Partners, EPD"},
    {company: "Travelers Cos., TRV"},
    {company: "Philip Morris International, PM"},
    {company: "Rite Aid, RAD"},
    {company: "Tech Data, TECD"},
    {company: "McDonald's, MCD"},
    {company: "Qualcomm, QCOM"},
    {company: "Sears Holdings, SHLD"},
    {company: "Capital One Financial, COF"},
    {company: "EMC, EMC"},
    {company: "USAA, "},
    {company: "Duke Energy, DUK"},
    {company: "Time Warner Cable, TWC"},
    {company: "Halliburton, HAL"},
    {company: "Northrop Grumman, NOC"},
    {company: "Arrow Electronics, ARW"},
    {company: "Raytheon, RTN"},
    {company: "Plains GP Holdings, PAGP"},
    {company: "US Foods, "},
    {company: "AbbVie, ABBV"},
    {company: "Centene, CNC"},
    {company: "Community Health Systems, CYH"},
    {company: "Arconic, ARNC"},
    {company: "International Paper, IP"},
    {company: "Emerson Electric, EMR"},
    {company: "Union Pacific, UNP"},
    {company: "Amgen, AMGN"},
    {company: "U.S. Bancorp, USB"},
    {company: "Staples, SPLS"},
    {company: "Danaher, DHR"},
    {company: "Whirlpool, WHR"},
    {company: "Aflac, AFL"},
    {company: "AutoNation, AN"},
    {company: "Progressive, PGR"},
    {company: "Abbott Laboratories, ABT"},
    {company: "Dollar General, DG"},
    {company: "Tenet Healthcare, THC"},
    {company: "Eli Lilly, LLY"},
    {company: "Southwest Airlines, LUV"},
    {company: "Penske Automotive Group, PAG"},
    {company: "ManpowerGroup, MAN"},
    {company: "Kohl's, KSS"},
    {company: "Starbucks, SBUX"},
    {company: "Paccar, PCAR"},
    {company: "Cummins, CMI"},
    {company: "Altria Group, MO"},
    {company: "Xerox, XRX"},
    {company: "Kimberly-Clark, KMB"},
    {company: "Hartford Financial Services Group, HIG"},
    {company: "Kraft Heinz, KHC"},
    {company: "Lear, LEA"},
    {company: "Fluor, FLR"},
    {company: "AECOM, ACM"},
    {company: "Facebook, FB"},
    {company: "Jabil Circuit, JBL"},
    {company: "CenturyLink, CTL"},
    {company: "Supervalu, SVU"},
    {company: "General Mills, GIS"},
    {company: "Southern, SO"},
    {company: "NextEra Energy, NEE"},
    {company: "Thermo Fisher Scientific, TMO"},
    {company: "American Electric Power, AEP"},
    {company: "PG&E Corp., PCG"},
    {company: "NGL Energy Partners, NGL"},
    {company: "Bristol-Myers Squibb, BMY"},
    {company: "Goodyear Tire & Rubber, G"},
    {company: "Nucor, NUE"},
    {company: "PNC Financial Services Group, PNC"},
    {company: "Health Net, HNT"},
    {company: "Micron Technology, MU"},
    {company: "Colgate-Palmolive, CL"},
    {company: "Freeport-McMoRan, FCX"},
    {company: "ConAgra Foods, CAG"},
    {company: "Gap, GPS"},
    {company: "Baker Hughes, BHI"},
    {company: "Bank of New York Mellon Corp., BK"},
    {company: "Dollar Tree, DLTR"},
    {company: "Whole Foods Market, WFM"},
    {company: "PPG Industries, PPG"},
    {company: "Genuine Parts, GPC"},
    {company: "Icahn Enterprises, IEP"},
    {company: "Performance Food Group, PFGC"},
    {company: "Omnicom Group, OMC"},
    {company: "DISH Network, DISH"},
    {company: "FirstEnergy, FE"},
    {company: "Monsanto, MON"},
    {company: "AES, AES"},
    {company: "CarMax, KMX"},
    {company: "National Oilwell Varco, NO8"},
    {company: "NRG Energy, NRG"},
    {company: "Western Digital, WDC"},
    {company: "Marriott International, MAR"},
    {company: "Office Depot, ODP"},
    {company: "Nordstrom, JWN"},
    {company: "Kinder Morgan, KMI"},
    {company: "Aramark, ARMK"},
    {company: "DaVita, DVA"},
    {company: "Molina Healthcare, MOH"},
    {company: "WellCare Health Plans, WCG"},
    {company: "CBS, CBS"},
    {company: "Visa, V"},
    {company: "Lincoln National, LNC"},
    {company: "Ecolab, ECL"},
    {company: "Kellogg, K"},
    {company: "C.H. Robinson Worldwide, CHRW"},
    {company: "Textron, TXT"},
    {company: "Loews, L"},
    {company: "Illinois Tool Works, ITW"},
    {company: "Synnex, SNX"},
    {company: "Viacom, VIAB"},
    {company: "HollyFrontier, HFC"},
    {company: "Land O'Lakes, LAKE"},
    {company: "Devon Energy, DVN"},
    {company: "PBF Energy, PBF"},
    {company: "Yum Brands, YUM"},
    {company: "Texas Instruments, TXN"},
    {company: "CDW, CDW"},
    {company: "Waste Management, WM"},
    {company: "Marsh & McLennan, MMC"},
    {company: "Chesapeake Energy, CHK"},
    {company: "Parker-Hannifin, PH"},
    {company: "Occidental Petroleum, OXY"},
    {company: "Guardian Life Ins. Co. of America, "},
    {company: "Farmers Insurance Exchange, "},
    {company: "J.C. Penney, JCP"},
    {company: "Consolidated Edison, ED"},
    {company: "Cognizant Technology Solutions, CTSH"},
    {company: "VF, VFC"},
    {company: "Ameriprise Financial, AMP"},
    {company: "Computer Sciences, CSC"},
    {company: "L Brands, LB"},
    {company: "Jacobs Engineering Group, JEC"},
    {company: "Principal Financial Group, PFG"},
    {company: "Ross Stores, ROST"},
    {company: "Bed Bath & Beyond, BBBY"},
    {company: "CSX, CSX"},
    {company: "Toys , TOY"},
    {company: "Las Vegas Sands, LVS"},
    {company: "Leucadia National, LUK"},
    {company: "Dominion Resources, D"},
    {company: "United States Steel, X"},
    {company: "L-3 Communications, LLL"},
    {company: "Edison International, EIX"},
    {company: "Entergy, ELA"},
    {company: "ADP, ADP"},
    {company: "First Data, FDC"},
    {company: "BlackRock, BLK"},
    {company: "WestRock, WRK"},
    {company: "Voya Financial, VOYA"},
    {company: "Sherwin-Williams, SHW"},
    {company: "Hilton Worldwide Holdings, HLT"},
    {company: "R.R. Donnelley & Sons, RRD"},
    {company: "Stanley Black & Decker, SWK"},
    {company: "Xcel Energy, XEL"},
    {company: "Murphy USA, MUSA"},
    {company: "CBRE Group, CBG"},
    {company: "D.R. Horton, DHI"},
    {company: "Estee Lauder, EL"},
    {company: "Praxair, PX"},
    {company: "Biogen, BIIB"},
    {company: "State Street Corp., STT"},
    {company: "Unum Group, UNM"},
    {company: "Reynolds American, RAI"},
    {company: "Group 1 Automotive, GPI"},
    {company: "Henry Schein, HSIC"},
    {company: "Hertz Global Holdings, HRI"},
    {company: "Norfolk Southern, NSC"},
    {company: "Reinsurance Group of America, RGA"},
    {company: "Public Service Enterprise Group, PEG"},
    {company: "BB&T Corp., BBT"},
    {company: "DTE Energy, DTE"},
    {company: "Assurant, AIZ"},
    {company: "Global Partners, GLP"},
    {company: "Huntsman, HUN"},
    {company: "Becton Dickinson, BDX"},
    {company: "Sempra Energy, SRE"},
    {company: "AutoZone, AZO"},
    {company: "Navistar International, NAV"},
    {company: "Precision Castparts, PCP"},
    {company: "Discover Financial Services, DFS"},
    {company: "Liberty Interactive, QVCA"},
    {company: "W.W. Grainger, GWW"},
    {company: "Baxter International, BAX"},
    {company: "Stryker, SYK"},
    {company: "Air Products & Chemicals, APD"},
    {company: "Western Refining, WNR"},
    {company: "Universal Health Services, UHS"},
    {company: "Owens & Minor, OMI"},
    {company: "Charter Communications, CHTR"},
    {company: "Advance Auto Parts, AAP"},
    {company: "MasterCard, MA"},
    {company: "Applied Materials, AMAT"},
    {company: "Eastman Chemical, EMN"},
    {company: "Sonic Automotive, SAH"},
    {company: "Ally Financial, ALLY"},
    {company: "CST Brands, CST"},
    {company: "eBay, EBAY"},
    {company: "Lennar, LEN"},
    {company: "GameStop, GME"},
    {company: "Reliance Steel & Aluminum, RS"},
    {company: "Hormel Foods, HRL"},
    {company: "Celgene, CELG"},
    {company: "Genworth Financial, GNW"},
    {company: "PayPal Holdings, PYPL"},
    {company: "Priceline Group, PCLN"},
    {company: "MGM Resorts International, MGM"},
    {company: "Autoliv, ALV"},
    {company: "Fidelity National Financial, FNF"},
    {company: "Republic Services, RSG"},
    {company: "Corning, GLW"},
    {company: "Peter Kiewit Sons', "},
    {company: "Univar, UNVR"},
    {company: "Mosaic, MOS"},
    {company: "Core-Mark Holding, CORE"},
    {company: "Thrivent Financial for Lutherans, "},
    {company: "Cameron International, CAM"},
    {company: "HD Supply Holdings, HDS"},
    {company: "Crown Holdings, CCK"},
    {company: "EOG Resources, EOG"},
    {company: "Veritiv, VRTV"},
    {company: "Anadarko Petroleum, APC"},
    {company: "Laboratory Corp. of America, LH"},
    {company: "Pacific Life, "},
    {company: "News Corp., FOXA"},
    {company: "Jarden, JAH"},
    {company: "SunTrust Banks, STI"},
    {company: "Avis Budget Group, CAR"},
    {company: "Broadcom, BRCM"},
    {company: "American Family Insurance Group, "},
    {company: "Level 3 Communications, LVLT"},
    {company: "Tenneco, TEN"},
    {company: "United Natural Foods, UNFI"},
    {company: "Dean Foods, DF"},
    {company: "Campbell Soup, CPB"},
    {company: "Mohawk Industries, MHK"},
    {company: "BorgWarner, BWA"},
    {company: "PVH, PVH"},
    {company: "Ball, BLL"},
    {company: "O'Reilly Automotive, ORLY"},
    {company: "Eversource Energy, ES"},
    {company: "Franklin Resources, BEN"},
    {company: "Masco, MAS"},
    {company: "Lithia Motors, LAD"},
    {company: "KKR, KKR"},
    {company: "Oneok, OKE"},
    {company: "Newmont Mining, NEM"},
    {company: "PPL, PPL"},
    {company: "SpartanNash, SPTN"},
    {company: "Quanta Services, PWR"},
    {company: "XPO Logistics, XPO"},
    {company: "Ralph Lauren, RL"},
    {company: "Interpublic Group, IPG"},
    {company: "Steel Dynamics, STLD"},
    {company: "WESCO International, WCC"},
    {company: "Quest Diagnostics, DGX"},
    {company: "Boston Scientific, BSX"},
    {company: "AGCO, AGCO"},
    {company: "Foot Locker, FL"},
    {company: "Hershey, HSY"},
    {company: "CenterPoint Energy, CNP"},
    {company: "Williams, WMB"},
    {company: "Dick's Sporting Goods, DKS"},
    {company: "Live Nation Entertainment, LYV"},
    {company: "Mutual of Omaha Insurance, "},
    {company: "W.R. Berkley, WRB"},
    {company: "LKQ, LKQ"},
    {company: "Avon Products, AVP"},
    {company: "Darden Restaurants, DRI"},
    {company: "Kindred Healthcare, KND"},
    {company: "Weyerhaeuser, WY"},
    {company: "Casey's General Stores, CASY"},
    {company: "Sealed Air, SEE"},
    {company: "Fifth Third Bancorp, FITB"},
    {company: "Dover, DOV"},
    {company: "Huntington Ingalls Industries, HII"},
    {company: "Netflix, NFLX"},
    {company: "Dillard's, DDS"},
    {company: "EMCOR Group, EME"},
    {company: "Jones Financial, JONE"},
    {company: "AK Steel Holding, AKS"},
    {company: "UGI, UGI"},
    {company: "Expedia, EXPE"},
    {company: "salesforce.com, CRM"},
    {company: "Targa Resources, TRGP"},
    {company: "Apache, APA"},
    {company: "Spirit AeroSystems Holdings, SPR"},
    {company: "Expeditors International of Washington, EXPD"},
    {company: "Anixter International, AXE"},
    {company: "Fidelity National Information Services, FIS"},
    {company: "Asbury Automotive Group, ABG"},
    {company: "Hess, HES"},
    {company: "Ryder System, R"},
    {company: "Terex, TEX"},
    {company: "Coca-Cola European Partners, "},
    {company: "Auto-Owners Insurance, "},
    {company: "Cablevision Systems, CVC"},
    {company: "Symantec, SYMC"},
    {company: "Charles Schwab, SCHW"},
    {company: "Calpine, CPN"},
    {company: "CMS Energy, CMS"},
    {company: "Alliance Data Systems, ADS"},
    {company: "JetBlue Airways, JBLU"},
    {company: "Discovery Communications, DISCA"},
    {company: "Trinity Industries, TRN"},
    {company: "Sanmina, SANM"},
    {company: "NCR, NCR"},
    {company: "FMC Technologies, FTI"},
    {company: "Erie Insurance Group, ERIE"},
    {company: "Rockwell Automation, ROK"},
    {company: "Dr Pepper Snapple Group, DPS"},
    {company: "iHeartMedia, IHRT"},
    {company: "Tractor Supply, TSCO"},
    {company: "J.B. Hunt Transport Services, JBHT"},
    {company: "Commercial Metals, CMC"},
    {company: "Owens-Illinois, OI"},
    {company: "Harman International Industries, HAR"},
    {company: "Baxalta, BXLT"},
    {company: "American Financial Group, AFG"},
    {company: "NetApp, NTAP"},
    {company: "Graybar Electric, "},
    {company: "Oshkosh, OSK"},
    {company: "Ameren, AEE"},
    {company: "A-Mark Precious Metals, AMRK"},
    {company: "Barnes & Noble, BKS"},
    {company: "Dana Holding, DAN"},
    {company: "Constellation Brands, STZ"},
    {company: "LifePoint Health, LPNT"},
    {company: "Zimmer Biomet Holdings, ZBH"},
    {company: "Harley-Davidson, HOG"},
    {company: "PulteGroup, PHM"},
    {company: "Newell Brands, NWL"},
    {company: "Avery Dennison, AVY"},
    {company: "Jones Lang LaSalle, JLL"},
    {company: "WEC Energy Group, WEC"},
    {company: "Marathon Oil, MRO"},
    {company: "TravelCenters of America, TA"},
    {company: "United Rentals, URI"},
    {company: "HRG Group, HRG"},
    {company: "Old Republic International, ORI"},
    {company: "Windstream Holdings, WIN"},
    {company: "Starwood Hotels & Resorts, HOT"},
    {company: "Delek US Holdings, DK"},
    {company: "Packaging Corp. of America, PKG"},
    {company: "Quintiles IMS Holdings, Q"},
    {company: "Hanesbrands, HBI"},
    {company: "Realogy Holdings, RLGY"},
    {company: "Mattel, MAT"},
    {company: "Motorola Solutions, MSI"},
    {company: "J.M. Smucker, SJM"},
    {company: "Regions Financial, RF"},
    {company: "Celanese, CE"},
    {company: "Clorox, CLX"},
    {company: "Ingredion, INGR"},
    {company: "Genesis Healthcare, GEN"},
    {company: "Peabody Energy, BTU"},
    {company: "Alaska Air Group, ALK"},
    {company: "Seaboard, SEB"},
    {company: "Frontier Communications, FTR"},
    {company: "Amphenol, APH"},
    {company: "Lansing Trade Group, "},
    {company: "SanDisk, SNDK"},
    {company: "St. Jude Medical, STJ"},
    {company: "Wyndham Worldwide, WYN"},
    {company: "Kelly Services, KELYA"},
    {company: "Western Union, WU"},
    {company: "Envision Healthcare Holdings, "},
    {company: "Visteon, VC"},
    {company: "Arthur J. Gallagher, AJG"},
    {company: "Host Hotels & Resorts, HST"},
    {company: "Ashland, ASH"},
    {company: "Insight Enterprises, NSIT"},
    {company: "Energy Future Holdings, "},
    {company: "Markel, MKL"},
    {company: "Essendant, ESND"},
    {company: "CH2M Hill, "},
    {company: "Western & Southern Financial Group, "},
    {company: "Owens Corning, OC"},
    {company: "S&P Global, SPGI"},
    {company: "Raymond James Financial, RJF"},
    {company: "NiSource, NI"},
    {company: "Airgas, ARG"},
    {company: "ABM Industries, ABM"},
    {company: "Citizens Financial Group, CFG"},
    {company: "Booz Allen Hamilton Holding, BAH"},
    {company: "Simon Property Group, SPGI"},
    {company: "Domtar, UFS"},
    {company: "Rockwell Collins, COL"},
    {company: "Lam Research, LRCX"},
    {company: "Fiserv, FISV"},
    {company: "Spectra Energy, SE"},
    {company: "Navient, NAVI"},
    {company: "Big Lots, BIG"},
    {company: "Telephone & Data Systems, TDS"},
    {company: "First American Financial, FAF"},
    {company: "NVR, NVR"},
    {company: "Cincinnati Financial, CINF"},
    {company: "Burlington Stores, BURL"}
  ];

module.exports = tickers;