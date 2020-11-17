export const categories = [
    {id:1, value:"Transportation",label:"Transportation",color:"rgba(238,123,92,0.2)", colorBorder:"rgba(238,123,92,1)",colorHover:"rgba(238,123,92,0.7)"},
    {id:2, value:"Food",label:"Food",color:"rgba(224, 159, 62,0.2)",colorBorder:"rgba(224, 159, 62,1)",colorHover:"rgba(224, 159, 62,0.7)"},
    {id:3, value:"Utilities",label:"Utilities",color:'rgba(158, 42, 43,0.2)',colorBorder:'rgba(158, 42, 43,1)',colorHover:'rgba(158, 42, 43,0.7)'},
    {id:4, value:"Social",label:"Social",color:'rgba(84, 11, 14,0.2)',colorBorder:'rgba(84, 11, 14,1)',colorHover:'rgba(84, 11, 14,0.7)'},
    {id:5, value:"Clothing",label:"Clothing",color:'rgba(25, 114, 120,0.2)',colorBorder:'rgba(25, 114, 120,1)',colorHover:'rgba(25, 114, 120,0.7)'},
<<<<<<< HEAD
    {id:6, value:"Medical",label:"Medical",color:'rgba(219,112,147,0.2)',colorBorder:'rgba(219,112,147,1)',colorHover:'rgba(219,112,147,0.7)'},
=======
    {id:6, value:"Medical",label:"Medical",color:'rgba(253, 226, 228,0.2)',colorBorder:'rgba(253, 226, 228,1)',colorHover:'rgba(253, 226, 228,0.7)'},
>>>>>>> green
    {id:7, value:"Health",label:"Health",color:'rgba(165,102,131,0.2)',colorBorder:'rgba(165,102,131,1)',colorHover:'rgba(165,102,131,0.7)'},
    {id:8, value:"Beauty",label:"Beauty",color:'rgba(238,146,90,0.2)',colorBorder:'rgba(238,146,90,1)',colorHover:'rgba(238,146,90,0.7)'},
    {id:9, value:"Insurance",label:"Insurance",color:'rgba(160,186,209,0.2)',colorBorder:'rgba(160,186,209,1)',colorHover:'rgba(160,186,209,0.7)'},
    {id:10, value:"Personal",label:"Personal",color:'rgba(73,116,169,0.2)',colorBorder:'rgba(73,116,169,1)',colorHover:'rgba(73,116,169,0.7)'},
    {id:11, value:"Debt",label:"Debt",color:'rgba(177,9,103,0.2)',colorBorder:'rgba(177,9,103,1)',colorHover:'rgba177,9,103,0.7)'},
    {id:12, value:"Retirement",label:"Retirement",color:'rgba(220,70,134,0.2)',colorBorder:'rgba(220,70,134,1)',colorHover:'rgba(220,70,134,0.7)'},
    {id:13, value:"Savings",label:"Savings",color:'rgba(192,73,201,0.2)',colorBorder:'rgba(192,73,201,1)',colorHover:'rgba(192,73,201,0.7)'},
    {id:14, value:"Education",label:"Education",color:'rgba(207,201,73,0.2)',colorBorder:'rgba(207,201,73,1)',colorHover:'rgba(207,201,73,0.7)'},
    {id:15, value:"Giving",label:"Giving",color:'rgba(94,83,133,0.2)',colorBorder:'rgba(94,83,133,1)',colorHover:'rgba(94,83,133,0.7)'},
    {id:16, value:"Taxes",label:"Taxes",color:'rgba(72,70,27,0.2)',colorBorder:'rgba(72,70,27,1)',colorHover:'rgba(72,70,27,0.7)'},
    {id:17, value:"Investments",label:"Investments",color:'rgba(25,61,237,0.2)',colorBorder:'rgba(25,61,237,1)',colorHover:'rgba(25,61,237,0.7)'},
    {id:18, value:"Hobbies",label:"Hobbies",color:'rgba(44,117,64,0.2)',colorBorder:'rgba(44,117,64,1)',colorHover:'rgba(44,117,64,0.7)'},
    {id:19, value:"Pets",label:"Pets",color:'rgba(232,175,49,0.2)',colorBorder:'rgba(232,175,49,1)',colorHover:'rgba(232,175,49,0.7)'},
    {id:20, value:"Other",label:"Other",color:'rgba(18,23,60,0.2)',colorBorder:'rgba(18,23,60,1)',colorHover:'rgba(18,23,60,0.7)'}
];

export const subcategories = [
    { id:1,parent:"Transportation",value: 'Gas', label: 'Gas' },
    { id:2,parent:"Transportation",value: 'Car Payment', label: 'Car Payment' },
    { id:3,parent:"Transportation",value: 'Maintenance/Oil Change', label: 'Maintenance/Oil Change' },
    { id:4,parent:"Transportation",value: 'Repairs', label: 'Repairs' },
    { id:5,parent:"Transportation",value: 'Tires', label: 'Tires' },
    { id:6,parent:"Transportation",value: 'DMV', label: 'DMV' },
    { id:7,parent:"Transportation",value: 'Car Warranty', label: 'Car Warranty' },
    { id:8,parent:"Transportation",value: 'Parking Fees', label: 'Parking Fees' },
    { id:9,parent:"Transportation",value: 'Other', label: 'Other' },

    { id:10,parent:"Food",value: 'Groceries', label: 'Groceries' },
    { id:11,parent:"Food",value: 'Restaurants', label: 'Restaurants' },
    { id:12,parent:"Food",value: 'Pet Food', label: 'Pet Food' },
    { id:13,parent:"Food",value: 'Other', label: 'Other' },

    { id:14,parent:"Utilities",value: 'Electricity', label: 'Electricity'},
    { id:15,parent:"Utilities",value: 'Water', label: 'Water'},
    { id:16,parent:"Utilities",value: 'Garbage', label: 'Garbage'},
    { id:17,parent:"Utilities",value: 'Phone', label: 'Phone'},
    { id:18,parent:"Utilities",value: 'Cable', label: 'Cable'},
    { id:19,parent:"Utilities",value: 'Internet', label: 'Internet'},
    { id:20,parent:"Utilities",value: 'Gas/Energy', label: 'Gas/Energy'},
    { id:21,parent:"Utilities",value: 'Other', label: 'Other'},

    { id:22,parent:"Social",value: 'Dating', label: 'Dating'},
    { id:23,parent:"Social",value: 'Friends', label: 'Friends'},
    { id:24,parent:"Social",value: 'Going Out', label: 'Going Out'},
    { id:25,parent:"Social",value: 'Eating Out', label: 'Eating Out'},
    { id:26,parent:"Social",value: 'Social Gatherings', label: 'Social Gatherings'},
    { id:27,parent:"Social",value: 'Other', label: 'Other'},

    { id:28,parent:"Clothing",value: 'Shoes', label: 'Shoes'},
    { id:29,parent:"Clothing",value: 'Dress Clothes', label: 'Dress Clothes'},
    { id:30,parent:"Clothing",value: 'Sports Equipment', label: 'Sports Equipment'},
    { id:31,parent:"Clothing",value: 'Children', label: 'Children'},
    { id:32,parent:"Clothing",value: 'Thrift', label: 'Thrift'},

    { id:33,parent:"Medical",value: 'Primary Care', label: 'Primary Care'},
    { id:34,parent:"Medical",value: 'Dental Care', label: 'Dental Care'},
    { id:35,parent:"Medical",value: 'Specialty Care', label: 'Specialty Care'},
    { id:36,parent:"Medical",value: 'Urgent Care', label: 'Urgent Care'},
    { id:37,parent:"Medical",value: 'Medications', label: 'Medications'},
    { id:38,parent:"Medical",value: 'Emergency', label: 'Emergency'},
    { id:39,parent:"Medical",value: 'Medical Devices', label: 'Medical Device'},
    { id:40,parent:"Medical",value: 'General', label: 'General'},
    { id:41,parent:"Medical",value: 'Procedures', label: 'Procedures'},
    { id:42,parent:"Medical",value: 'Other', label: 'Other'},
        
];
export const monthLabels=["January","February","March","April","May","June","July", "August","September","October","November","December"];
export const monthNames = [
    {id:0, value:"January", label:"January", days:31 },
    {id:1, value:"February", label:"February", days:28},
    {id:2, value:"March", label:"March", days:31},
    {id:3, value:"April", label:"April", days:30},
    {id:4, value:"May", label:"May", days:31},
    {id:5, value:"June", label:"June", days:30},
    {id:6, value:"July", label:"July", days:31},
    {id:7, value:"August", label:"August", days:31},
    {id:8, value:"September", label:"September", days:30},
    {id:9, value:"October", label:"October", days:31},
    {id:10, value:"November", label:"November", days:30},
    {id:11, value:"December", label:"December", days:31},
    {id:12, value:"All", label:"All", days:0}

];