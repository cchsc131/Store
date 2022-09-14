/*
 Navicat Premium Data Transfer

 Source Server         : yiqing
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : vue_store

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 14/09/2022 15:40:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uId` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `province` varchar(252) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `county` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `addressDetail` varchar(522) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isDefault` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `areaCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 74 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (67, 15, '65', '13245678901', '北京市', '北京市', '朝阳区', 'daw', '0', '110105');
INSERT INTO `address` VALUES (63, 15, '火麒麟', '12345678910', '天津市', '天津市', '静海区', 'XXXX', '0', '120118');
INSERT INTO `address` VALUES (57, 30, '6541651', '12345678930', '北京市', '北京市', '东城区', '1', '1', '110101');
INSERT INTO `address` VALUES (66, 15, '雷神', '12345678910', '江西省', '新余市', '渝水区', 'XXXX', '1', '360502');
INSERT INTO `address` VALUES (56, 30, '12', '12345678910', '天津市', '天津市', '河东区', '656', '0', '120102');
INSERT INTO `address` VALUES (38, 27, '李四', '16360027702', '河北省', '石家庄市', '长安区', '大娃娃', '0', NULL);
INSERT INTO `address` VALUES (39, 27, '张三', '19390037702', '山西省', '太原市', '小店区', '大武', '1', NULL);
INSERT INTO `address` VALUES (65, 31, '123', '13245678910', '北京市', '北京市', '东城区', 'XXXX', '1', '110101');
INSERT INTO `address` VALUES (47, 29, '火麒麟123', '12345678911', '河北省', '石家庄市', '长安区', 'XXXX', '0', '130102');
INSERT INTO `address` VALUES (48, 29, '123', '13246578910', '山西省', '太原市', '小店区', '123', '0', '140105');
INSERT INTO `address` VALUES (64, 31, 'hm', '12345678910', '吉林省', '辽源市', '东辽县', 'xxxx', '0', '220422');
INSERT INTO `address` VALUES (51, 29, '15335', '12345678910', '天津市', '天津市', '河东区', '123', '1', '120102');
INSERT INTO `address` VALUES (68, 15, 'adaw', '12345678911', '北京市', '北京市', '东城区', 'zzz', '0', '110101');
INSERT INTO `address` VALUES (69, 15, 'wadaw', '13245678910', '北京市', '北京市', '朝阳区', '5+65+6', '0', '110105');
INSERT INTO `address` VALUES (70, 15, '465464', '12345678910', '河北省', '秦皇岛市', '山海关区', 'wadwa', '0', '130303');
INSERT INTO `address` VALUES (71, 40, '韩少聪', '15350037702', '江西省', '上饶市', '余干县', 'XXXX', '1', '361127');
INSERT INTO `address` VALUES (72, 42, '万', '12345678910', '江西省', '上饶市', '余干县', 'XXXX', '0', '361127');
INSERT INTO `address` VALUES (73, 42, '韩', '12345678910', '北京市', '北京市', '东城区', '123', '1', '110101');
INSERT INTO `address` VALUES (74, 44, '123', '12345678910', '北京市', '北京市', '东城区', 'XXXX', '1', '110101');

-- ----------------------------
-- Table structure for goods_cart
-- ----------------------------
DROP TABLE IF EXISTS `goods_cart`;
CREATE TABLE `goods_cart`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_imgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 271 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_cart
-- ----------------------------
INSERT INTO `goods_cart` VALUES (270, '44', '7', '华为 P50手机', '4488', '2', '/images/goods7.jpg');
INSERT INTO `goods_cart` VALUES (271, '44', '3', 'iPhone 13 苹果手机', '5999', '1', '/images/goods3.jpg');
INSERT INTO `goods_cart` VALUES (267, '44', '2', '华为 nova 9手机', '2599', '1', '/images/goods2.jpg');
INSERT INTO `goods_cart` VALUES (258, '40', '3', 'iPhone 13 苹果手机', '5999', '1', '/images/goods3.jpg');
INSERT INTO `goods_cart` VALUES (259, '40', '4', 'iPhone 12 苹果手机', '5199', '1', '/images/goods4.jpg');
INSERT INTO `goods_cart` VALUES (260, '20', '3', 'iPhone 13 苹果手机', '5999', '1', '/images/goods3.jpg');
INSERT INTO `goods_cart` VALUES (261, '20', '4', 'iPhone 12 苹果手机', '5199', '1', '/images/goods4.jpg');
INSERT INTO `goods_cart` VALUES (264, '44', '6', '小米 12S Ultra手机', '5999', '5', '/images/goods6.jpg');
INSERT INTO `goods_cart` VALUES (265, '44', '2', '华为 nova 9手机', '2599', '3', '/images/goods2.jpg');

-- ----------------------------
-- Table structure for goods_list
-- ----------------------------
DROP TABLE IF EXISTS `goods_list`;
CREATE TABLE `goods_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` int(11) NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT NULL,
  `imgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `zh` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_list
-- ----------------------------
INSERT INTO `goods_list` VALUES (1, '华为 nova 10手机', '华为 nova 10手机', 2699, 101, '/images/goods1.jpg', NULL);
INSERT INTO `goods_list` VALUES (2, '华为 nova 9手机', '华为 nova 9手机', 2599, 999, '/images/goods2.jpg', NULL);
INSERT INTO `goods_list` VALUES (3, 'iPhone 13 苹果手机', 'iPhone 13 苹果手机', 5999, 788, '/images/goods3.jpg', NULL);
INSERT INTO `goods_list` VALUES (4, 'iPhone 12 苹果手机', 'iPhone 12 苹果手机', 5199, 500, '/images/goods4.jpg', NULL);
INSERT INTO `goods_list` VALUES (5, 'vivo X80新品旗舰手机', 'vivo X80新品旗舰手机', 3699, 99, '/images/goods5.jpg', NULL);
INSERT INTO `goods_list` VALUES (6, '小米 12S Ultra手机', '小米 12S Ultra手机', 5999, 68, '/images/goods6.jpg', NULL);
INSERT INTO `goods_list` VALUES (7, '华为 P50手机', '华为 P50手机', 4488, 1299, '/images/goods7.jpg', NULL);

-- ----------------------------
-- Table structure for store_order
-- ----------------------------
DROP TABLE IF EXISTS `store_order`;
CREATE TABLE `store_order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_price` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `uId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 188 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of store_order
-- ----------------------------
INSERT INTO `store_order` VALUES (188, '20220913205620173429', '华为 P50手机,iPhone 13 苹果手机,华为 nova 9手机,小米 12S Ultra手机,华为 nova 9手机', '12', '55366', '1', '44');
INSERT INTO `store_order` VALUES (187, '20220908212610169319', '华为 nova 10手机,华为 nova 9手机', '6', '15994', '2', '42');
INSERT INTO `store_order` VALUES (186, '20220908212540896637', '华为 nova 10手机,华为 nova 9手机', '6', '15994', '1', '42');
INSERT INTO `store_order` VALUES (185, '20220907221412189661', 'iPhone 13 苹果手机,iPhone 12 苹果手机', '2', '11198', '1', '40');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `imgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nickName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 45 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (18, '18370405195', '123456', '/images/tx2.jpg', '18370405195', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxODM3MDQwNTE5NSIsImlhdCI6MTY1NTExOTYzMn0.kueQz4yAVmMXc5klNMHY0poTptRqq2g0ijRfh0Tiulc');
INSERT INTO `user` VALUES (15, '15350037702', '123456', '/images/tx3.jpg', '15350037702', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNTM1MDAzNzcwMiIsImlhdCI6MTY1NTAxODM2OX0.bpMsc7IihYd0MFcud1S2O5orRjho4oiNvQsq7ALYZMo');
INSERT INTO `user` VALUES (19, '15350047702', '123456', '/images/tx2.jpg', '15350047702', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNTM1MDA0NzcwMiIsImlhdCI6MTY1NTE3MjI5Nn0.3IhU-lqjjV-KFfiRPYIIjeOo3YCxCf8XHcEDqqjOgCo');
INSERT INTO `user` VALUES (20, '12345678910', '123456', '/images/tx2.jpg', '12345678910', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODkxMCIsImlhdCI6MTY1NTE5MDY0MX0.ImzTJA1sUdmakY8Yad3G3A9nBSVP2M83Fc_NLqmiYSs');
INSERT INTO `user` VALUES (21, '13245678900', '123456', '/images/tx2.jpg', '13245678900', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzI0NTY3ODkwMCIsImlhdCI6MTY1NTE5NTQ2NX0.CEzLR1eXSS6xC7mZLQpIjR3o3lEAxfpMoYB6VZoEqm8');
INSERT INTO `user` VALUES (17, '15083798387', '123456', '/images/tx2.jpg', '..', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNTA4Mzc5ODM4NyIsImlhdCI6MTY1NTExODgwNn0.z1-54ensflls9egc23zve9qO2ZP85h2IC7gOxp7T2Ts');
INSERT INTO `user` VALUES (22, '12345678900', '123456', '/images/tx2.jpg', '12345678900', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODkwMCIsImlhdCI6MTY1NTE5NTk4NX0.SZ7TAC_CatX4u21eHO3NzeoOksgji3FixP0DtcdMhEY');
INSERT INTO `user` VALUES (23, '15234567891', '123456', '/images/tx2.jpg', '15234567891', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNTIzNDU2Nzg5MSIsImlhdCI6MTY1NTE5NjUwMH0.RN7Surpm8yu7oH9sFucUjjWUW1Zd_LNtl6SgU797QoQ');
INSERT INTO `user` VALUES (24, '12345678930', '123456', '/images/tx2.jpg', '12345678930', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODkzMCIsImlhdCI6MTY1NTQ2NDIzMH0.z3ofhruRv4CEtL37m2Ztl6PZjv9xdLHOYE7xcd3ZiTM');
INSERT INTO `user` VALUES (25, '18307997902', '123456', '/images/tx2.jpg', 'gg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxODMwNzk5NzkwMiIsImlhdCI6MTY1NTgxMjc0OH0.KvC6DjhMzWYsYVCreNTFJDCBPD6gSg8dv7UFOS2Wwtc');
INSERT INTO `user` VALUES (26, '12345678912', '123456', '/images/tx2.jpg', '12345678912', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODkxMiIsImlhdCI6MTY1NjU4ODI3NX0.dbLd__22EIqeGz5vJ2i5MX5eDwDqn5aMfT7y1C1Y9vo');
INSERT INTO `user` VALUES (27, '12345678933', '123456', '/images/tx2.jpg', '12345678933', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODkzMyIsImlhdCI6MTY1NjU5MzA4OX0.6Im0KsvnosQU8I1jv7lw31hrneuUGMgzzxUv5BmZetY');
INSERT INTO `user` VALUES (28, '15350236329', '123456', '/images/tx2.jpg', '15350236329', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNTM1MDIzNjMyOSIsImlhdCI6MTY1NjY3MzMyNH0.TX2sihsxfmgmY3M6rsG-ueC-urDA4g1GsU4u1Bpxrog');
INSERT INTO `user` VALUES (29, '18370857001', '123456', '/images/tx2.jpg', '18370857001', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxODM3MDg1NzAwMSIsImlhdCI6MTY1NjgzMzA4Mn0.TF5zDGcnhex2sGRZE-5MIzbpFuFTrkltSC0PZX2bC68');
INSERT INTO `user` VALUES (30, '12987654321', '123456', '/images/tx2.jpg', '12987654321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjk4NzY1NDMyMSIsImlhdCI6MTY1NzYyNTc2MX0.QJ_UuA9q1OcQIW6j8RQIOYCfAvWptF5sglWGTZO1y84');
INSERT INTO `user` VALUES (31, '15779587113', '123456', '/images/tx2.jpg', '15779587113', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNTc3OTU4NzExMyIsImlhdCI6MTY1Nzc5OTcyOH0.gq4uO5-z22-gfuegBQIbBeGdTYg7KRIktRAZLEFISeA');
INSERT INTO `user` VALUES (32, '12345678899', '123456', '/images/tx2.jpg', '12345678899', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODg5OSIsImlhdCI6MTY1ODEyNTM1NiwiZXhwIjoxNjU4MTI1NDE2fQ.WpOF6haeIfJ5twt3p6XmB34ngYmjXVc-JbOVmcbmTRw');
INSERT INTO `user` VALUES (33, '12345678980', '123456', '/images/tx2.jpg', '12345678980', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODk4MCIsImlhdCI6MTY2MjU1MTk1MH0.7rfK9mcVtwXXLHaRhIurbK1xBsnxyNvcjEUJ5zH0WBg');
INSERT INTO `user` VALUES (34, '12345678998', '123456', '/images/tx2.jpg', '12345678998', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODk5OCIsImlhdCI6MTY2MjU1MjYxM30.cwxvVCN_y6wiHdatVenwS16IsxaHdsqyT2Lh_v8_pVM');
INSERT INTO `user` VALUES (35, '12345678996', '123456', '/images/tx2.jpg', '12345678996', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODk5NiIsImlhdCI6MTY2MjU1MzkwMH0.bf4kDVaOXye9XE-uZeTsf2DaecKBuzxB8WFoPiJouis');
INSERT INTO `user` VALUES (36, '12345678995', '123456', '/images/tx2.jpg', '12345678995', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODk5NSIsImlhdCI6MTY2MjU1Mzk3Mn0.LVC9zx5PIoKRKE8PQV73uBbQXCbJaxxztxAV2JZT0mw');
INSERT INTO `user` VALUES (37, '12345678987', '123456', '/images/tx2.jpg', '12345678987', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODk4NyIsImlhdCI6MTY2MjU1ODQxNn0.pR1ndSVycLZ7xhNBKKzbzmsWyQb5ufEVup4wKy8i5SM');
INSERT INTO `user` VALUES (38, '12345678999', '123456', '/images/tx2.jpg', '12345678999', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODk5OSIsImlhdCI6MTY2MjU1ODU5N30.KFECHCLTyOW_FU8KoDpy_2HijMGDot7cWJkKTRr9FMM');
INSERT INTO `user` VALUES (39, '12345678989', '123456', '/images/tx2.jpg', '12345678989', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODk4OSIsImlhdCI6MTY2MjU1ODc2M30.VyIAks5vbiD0lNbbl550vutCYrxlLobZZt0e0m-kuuc');
INSERT INTO `user` VALUES (40, '12345678649', '123456', '/images/tx2.jpg', '12345678649', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODY0OSIsImlhdCI6MTY2MjU1OTIxNH0.FUzIvSlGOTB2RzTe1ztLpqMMaND1f3ak2glANSP5xpQ');
INSERT INTO `user` VALUES (41, '12345678920', '123456', '/images/tx2.jpg', '12345678920', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODkyMCIsImlhdCI6MTY2MjYwNzE4MX0.TtcX_Xy1jwLt5CShMOJaT3WhVlXLGnCfezEu-jgSh4s');
INSERT INTO `user` VALUES (42, '13170993515', '123456', '/images/tx2.jpg', '13170993515', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzE3MDk5MzUxNSIsImlhdCI6MTY2MjY0MzQwM30.p1b9Ee4s_HvTBe_XajmfSFCIdjkrj39Xyi-ePohjIQY');
INSERT INTO `user` VALUES (43, '12346578910', '123456', '/images/tx2.jpg', '12346578910', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NjU3ODkxMCIsImlhdCI6MTY2MjY0NDg4M30.g7Yc5W_grPaNiRdN9ytgJLBdXoxAfXp-4wT8HWGFLOc');
INSERT INTO `user` VALUES (44, '13245678950', '123456', '/images/tx2.jpg', '13245678950', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzI0NTY3ODk1MCIsImlhdCI6MTY2MjY0NTY0NX0.t3nmKPsHMYa2iF-LpYtk_Det-wJaoc1h6aoT-Hwx2AU');

SET FOREIGN_KEY_CHECKS = 1;
