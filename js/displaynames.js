/*
 Copyright (c) 2012 Brian Silverman, Barry Silverman, Ed Spittles
*/

var regNames = [
  'reg24','reg23','reg22','reg21','reg20','reg19','reg18','reg17','reg16','reg15','reg14','reg13',
  'reg12','reg11','reg10','reg9','reg8','reg7','reg6','reg5','reg4','reg3','reg2','reg1','reg0',
];

var regDisplayNames = [
  'r15 (pc)',
  'r14_svc','r14_irq','r14_fiq','r14 (link)',
  'r13_svc','r13_irq','r13_fiq','r13',
  'r12_fiq','r12',
  'r11_fiq','r11',
  'r10_fiq','r10',
  'r9','r8','r7','r6','r5','r4','r3','r2','r1','r0',
];

var regDisplayMap = {
  'r15 (pc)'	: 'reg24',
  'pc'		: 'reg24',
  'r15'		: 'reg24',
  'r14_svc'	: 'reg23',
  'r14_irq'	: 'reg22',
  'r14_fiq'	: 'reg21',
  'r14 (link)'	: 'reg20',
  'r14'		: 'reg20',
  'r13_svc'	: 'reg19',
  'r13_irq'	: 'reg18',
  'r13_fiq'	: 'reg17',
  'r13'		: 'reg16',
  'r12_fiq'	: 'reg15',
  'r12'		: 'reg14',
  'r11_fiq'	: 'reg13',
  'r11'		: 'reg12',
  'r10_fiq'	: 'reg11',
  'r10'		: 'reg10',
  'r9'		: 'reg9',
  'r8'		: 'reg8',
  'r7'		: 'reg7',
  'r6'		: 'reg6',
  'r5'		: 'reg5',
  'r4'		: 'reg4',
  'r3'		: 'reg3',
  'r2'		: 'reg2',
  'r1'		: 'reg1',
  'r0'		: 'reg0',
};

/* 25 registers in the register file, mapped to 16 registers in each of 4 processor modes (with much overlap) */

/* note that node 0 is known to be vss, and register 24, aka pc, has two missing LSBs and six missing MSBs */
var regfile = {
'reg24': [ 6001,6000,5999,6022,6021,6020,6019,6018,6017,6016,6015,6014,6013,6012,6011,6010,6009,6008,6007,6006,6005,6004,6003,6002,0,0,],
'reg23': [ 6077,6076,6075,6074,6073,6072,6070,6069,6112,6111,6110,6109,6108,6107,6106,6105,6103,6102,6101,6100,6099,6098,6097,6096,6095,6094,6092,6091,6082,6071,6104,6093,],
'reg22': [ 6203,6201,6198,6196,6193,6191,6189,6187,6185,6247,6245,6243,6240,6238,6235,6233,6231,6229,6227,6225,6223,6221,6218,6216,6213,6211,6209,6207,6205,6195,6237,6215,],
'reg21': [ 6282,6281,6280,6279,6278,6277,6275,6274,6318,6317,6316,6315,6314,6313,6312,6311,6309,6308,6307,6306,6305,6304,6303,6302,6301,6300,6298,6296,6287,6276,6310,6299,],
'reg20': [ 6407,6405,6402,6400,6397,6395,6393,6391,6389,6451,6449,6447,6444,6442,6439,6437,6435,6433,6431,6429,6427,6425,6422,6420,6417,6415,6413,6411,6409,6399,6441,6419,],
'reg19': [ 6486,6485,6484,6483,6482,6481,6479,6478,6521,6520,6519,6518,6517,6516,6515,6514,6512,6511,6510,6509,6508,6507,6506,6505,6504,6503,6501,6500,6491,6480,6513,6502,],
'reg18': [ 6601,6599,6596,6594,6591,6589,6587,6585,6583,6645,6643,6641,6638,6636,6633,6631,6629,6627,6625,6623,6621,6619,6616,6614,6611,6609,6607,6605,6603,6593,6635,6613,],
'reg17': [ 6678,6677,6676,6675,6674,6673,6671,6670,6713,6712,6711,6710,6709,6708,6707,6706,6704,6703,6702,6701,6700,6699,6698,6697,6696,6695,6693,6692,6683,6672,6705,6694,],
'reg16': [ 6811,6809,6806,6804,6801,6799,6797,6795,6793,6855,6853,6851,6848,6846,6843,6841,6839,6837,6835,6833,6831,6829,6826,6824,6821,6819,6817,6815,6813,6803,6845,6823,],
'reg15': [ 6901,6900,6899,6898,6897,6896,6894,6893,6937,6936,6935,6934,6933,6932,6931,6930,6928,6927,6926,6925,6924,6923,6922,6921,6920,6919,6917,6915,6906,6895,6929,6918,],
'reg14': [ 7036,7034,7031,7029,7026,7024,7022,7020,7018,7080,7078,7076,7073,7071,7068,7066,7064,7062,7060,7058,7056,7054,7051,7049,7046,7044,7042,7040,7038,7028,7070,7048,],
'reg13': [ 45,44,43,42,41,40,38,37,80,79,78,77,76,75,74,73,71,70,69,68,67,66,65,64,63,62,60,59,50,39,72,61,],
'reg12': [ 181,179,176,174,171,169,167,165,163,225,223,221,218,216,213,211,209,207,205,203,201,199,196,194,191,189,187,185,183,173,215,193,],
'reg11': [ 271,270,269,268,267,266,264,263,306,305,304,303,302,301,300,299,297,296,295,294,293,292,291,290,289,288,286,285,276,265,298,287,],
'reg10': [ 403,401,398,396,393,391,389,387,385,447,445,443,440,438,435,433,431,429,427,425,423,421,418,416,413,411,409,407,405,395,437,415,],
'reg9': [ 486,485,484,483,482,481,479,478,521,520,519,518,517,516,515,514,512,511,510,509,508,507,506,505,504,503,501,500,491,480,513,502,],
'reg8': [ 621,619,616,614,611,609,607,605,603,665,663,661,658,656,653,651,649,647,645,643,641,639,636,634,631,629,627,625,623,613,655,633,],
'reg7': [ 705,704,703,702,701,700,698,697,740,739,738,737,736,735,734,733,731,730,729,728,727,726,725,724,723,722,720,719,710,699,732,721,],
'reg6': [ 835,833,830,828,825,823,821,819,817,879,877,875,872,870,867,865,863,861,859,857,855,853,850,848,845,843,841,839,837,827,869,847,],
'reg5': [ 911,910,909,908,907,906,904,903,946,945,944,943,942,941,940,939,937,936,935,934,933,932,931,930,929,928,926,925,916,905,938,927,],
'reg4': [ 1029,1027,1024,1022,1019,1017,1015,1013,1011,1073,1071,1069,1066,1064,1061,1059,1057,1055,1053,1051,1049,1047,1044,1042,1039,1037,1035,1033,1031,1021,1063,1041,],
'reg3': [ 1122,1121,1120,1119,1118,1117,1115,1114,1157,1156,1155,1154,1153,1152,1151,1150,1148,1147,1146,1145,1144,1143,1142,1141,1140,1139,1137,1136,1127,1116,1149,1138,],
'reg2': [ 1255,1253,1250,1248,1245,1243,1241,1239,1237,1299,1297,1295,1292,1290,1287,1285,1283,1281,1279,1277,1275,1273,1270,1268,1265,1263,1261,1259,1257,1247,1289,1267,],
'reg1': [ 1327,1326,1325,1324,1323,1322,1320,1319,1362,1361,1360,1359,1358,1357,1356,1355,1353,1352,1351,1350,1349,1348,1347,1346,1345,1344,1342,1341,1332,1321,1354,1343,],
'reg0': [ 1465,1463,1460,1458,1455,1453,1451,1449,1447,1510,1508,1506,1503,1501,1498,1496,1494,1492,1490,1488,1486,1484,1481,1479,1476,1474,1472,1470,1467,1457,1500,1478,],
};

var psrByte = ['psr_n', 'psr_z', 'psr_c', 'psr_v', 'psr_irq', 'psr_fiq', 'psr_s1', 'psr_s0'];

var psrBits={
psr_n: 1661,
psr_z: 1663,
psr_c: 1665,
psr_v: 1667,
psr_irq: 1668,
psr_fiq: 1669,
psr_s1: 1670,
psr_s0: 1671,
};

var internalBusses = {
'abuslowbyte': [3331,3330,3329,3328,3327,3326,3325,3324,],
'na_bus': [7578,7577,7576,7575,7574,7573,7572,7571,7570,7569,7568,7567,7566,7565,7564,7563,7562,7561,7560,7559,7558,7557,7580,7579,8167,8166,8165,8164,8163,8162,8161,8160,],
'nb_bus': [8180,8179,8178,8177,8176,8175,7597,7596,7595,7594,7593,7592,7590,7589,7588,7587,7586,7585,7584,7583,7582,7581,7604,7603,7602,7601,7600,7599,7598,7591,8174,8173,],
'alu_bus': [8057,8056,8055,8054,8053,8052,7549,7548,7547,7546,7545,7544,7542,7541,7540,7539,7538,7537,7536,7535,7534,7533,7556,7555,7554,7553,7552,7551,7550,7543,8051,8050,],
'shout_bus': [7526,7525,7523,7522,7521,7520,7519,7518,7517,7516,7515,7514,7512,7511,7510,7509,7508,7507,7506,7505,7504,7503,7532,7531,7530,7529,7528,7527,7524,7513,7502,7501,],
// ireg has 3 bits bussed out driving nothing?
'ireg_bus': [8148,8147,8145,8144, 7952,7944,7935, 8143,8142,8141,8140,8139,8137,8136,8135,8134,8133,8132,8131,8130,8129,8128,8154,8153,8152,8151,8150,8149,8146,8138,8127,8126,],
}