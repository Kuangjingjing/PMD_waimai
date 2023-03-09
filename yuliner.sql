/*
 Navicat Premium Data Transfer

 Source Server         : myapp
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : yuliner

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 07/06/2022 21:41:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 38 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (26, '夏至', '123123', '中国安徽省', '小夏');
INSERT INTO `address` VALUES (25, '夏至', '132123131', '宜秀区筑梦新区', '小夏');
INSERT INTO `address` VALUES (27, '飞林', '12345678910', '安庆宜秀区', 'feiling');
INSERT INTO `address` VALUES (28, '飞林', '12345678910', '安庆宜秀区', 'feiling');
INSERT INTO `address` VALUES (31, '静静', '18888888888', '安庆宜秀区', 'jingjing');
INSERT INTO `address` VALUES (32, '小静', '1222', '11', 'jingjing');
INSERT INTO `address` VALUES (36, '张飞林', '15512345678', '安庆宜秀区', 'xiaolin');
INSERT INTO `address` VALUES (35, '111', '1111', '11', 'jingjing');
INSERT INTO `address` VALUES (37, '张亭丽', '17712345678', '安庆宜秀区', 'tingli');

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES (3, 'tom', '011c945f30ce2cbafc452f39840f025693339c42');
INSERT INTO `admin_user` VALUES (5, '唐僧11', '6216f8a75fd5bb3d5f22b6f9958cdede3fc086c2');
INSERT INTO `admin_user` VALUES (6, '孙悟空11', '420df50a0a436cabe48e1597a9508a2b5449d35e');
INSERT INTO `admin_user` VALUES (8, '孙悟空', '6216f8a75fd5bb3d5f22b6f9958cdede3fc086c2');
INSERT INTO `admin_user` VALUES (9, '小明', '43814346e21444aaf4f70841bf7ed5ae93f55a9d');

-- ----------------------------
-- Table structure for admin_users
-- ----------------------------
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin_users
-- ----------------------------
INSERT INTO `admin_users` VALUES (24, 'admin', '40bd001563085fc35165329ea1ff5c5ecbdbbeef');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comments_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `shoplist_id` int(11) NOT NULL,
  `comments_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userpic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (22, 'tingli', '111', 7, '2022-06-07 21:37:30', '444.jpg');
INSERT INTO `comments` VALUES (20, 'jingjing', '111', 7, '2022-06-07 21:23:20', '222.jpg');
INSERT INTO `comments` VALUES (21, 'jingjing', '11', 7, '2022-06-07 21:23:56', '222.jpg');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foodname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `descr` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `price` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `shoplist_id` int(11) NOT NULL,
  `foodpic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `num` int(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (17, '汉堡', '好吃好吃耶', '12', 6, '8db6264e350b33b881b282005.jpg', 10);
INSERT INTO `goods` VALUES (18, '汉堡', '又香又辣，好吃极了', '18', 6, '8db6264e350b33b881b282006.jpg', 20);
INSERT INTO `goods` VALUES (13, '臭豆腐1', '好吃好吃耶', '20', 3, '8db6264e350b33b881b282000.jpg', 5);
INSERT INTO `goods` VALUES (15, '火锅食材', '分量足', '20', 7, '8db6264e350b33b881b282003.jpg', 10);
INSERT INTO `goods` VALUES (16, '黄焖鸡', '肉超多', '15', 5, '8db6264e350b33b881b282004.jpg', 8);
INSERT INTO `goods` VALUES (14, '火锅套餐', '又香又辣，好吃极了', '150', 7, '8db6264e350b33b881b282002.jpg', 7);
INSERT INTO `goods` VALUES (12, '臭豆腐', '好吃好吃', '15', 2, '13c28577c57c0763adec6b300.webp', 10);
INSERT INTO `goods` VALUES (11, '汉堡', '好吃好吃', '19', 4, 'ff56e232716ae05e77f0a7301.webp', 9);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_num` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `food_totalprice` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `shoplist_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (24, 9783, 36, '170', 'xiaolin', 7);
INSERT INTO `orders` VALUES (23, 6897, 31, '19', 'jingjing', 2);
INSERT INTO `orders` VALUES (22, 5123, 27, '15', 'feiling', 3);
INSERT INTO `orders` VALUES (28, 868, 37, '150', 'tingli', 7);
INSERT INTO `orders` VALUES (27, 3247, 35, '30', 'jingjing', 6);
INSERT INTO `orders` VALUES (26, 8915, 32, '20', 'jingjing', 7);

-- ----------------------------
-- Table structure for orders_goods
-- ----------------------------
DROP TABLE IF EXISTS `orders_goods`;
CREATE TABLE `orders_goods`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foodname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `count` int(11) NOT NULL,
  `orders_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of orders_goods
-- ----------------------------
INSERT INTO `orders_goods` VALUES (28, '火锅套餐', '8db6264e350b33b881b282002.jpg', 1, 28);
INSERT INTO `orders_goods` VALUES (18, '火锅食材', '8db6264e350b33b881b282003.jpg', 1, 20);
INSERT INTO `orders_goods` VALUES (19, '火锅套餐', '8db6264e350b33b881b282002.jpg', 1, 20);
INSERT INTO `orders_goods` VALUES (20, '臭豆腐1', '8db6264e350b33b881b282000.jpg', 1, 21);
INSERT INTO `orders_goods` VALUES (21, '黄焖鸡', '8db6264e350b33b881b282004.jpg', 1, 22);
INSERT INTO `orders_goods` VALUES (22, '汉堡', 'ff56e232716ae05e77f0a7301.webp', 1, 23);
INSERT INTO `orders_goods` VALUES (23, '火锅食材', '8db6264e350b33b881b282003.jpg', 1, 24);
INSERT INTO `orders_goods` VALUES (24, '火锅套餐', '8db6264e350b33b881b282002.jpg', 1, 24);
INSERT INTO `orders_goods` VALUES (25, '火锅食材', '8db6264e350b33b881b282003.jpg', 1, 26);
INSERT INTO `orders_goods` VALUES (26, '汉堡', '8db6264e350b33b881b282006.jpg', 1, 27);
INSERT INTO `orders_goods` VALUES (27, '汉堡', '8db6264e350b33b881b282005.jpg', 1, 27);
INSERT INTO `orders_goods` VALUES (17, '汉堡', 'ff56e232716ae05e77f0a7301.webp', 1, 19);

-- ----------------------------
-- Table structure for shoplists
-- ----------------------------
DROP TABLE IF EXISTS `shoplists`;
CREATE TABLE `shoplists`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shopname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `logo` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `fee` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of shoplists
-- ----------------------------
INSERT INTO `shoplists` VALUES (4, '中国华莱士', 'ca0987c291299f8705ba07602.webp', '汉堡好吃', '3');
INSERT INTO `shoplists` VALUES (2, '长沙臭豆腐', '40f424381582cf01117d72503.webp', '闻着臭吃着香', '3');
INSERT INTO `shoplists` VALUES (3, '长沙臭豆腐', '40f424381582cf01117d72504.webp', '闻着臭吃着香', '3');
INSERT INTO `shoplists` VALUES (5, '黄焖鸡', '28a57b110668bc78a7c252200.webp', '好吃又好看', '3');
INSERT INTO `shoplists` VALUES (6, '华莱士', '9bf30d39360d6035e4c8b4c00.webp', '好吃的汉堡就是华莱士', '20');
INSERT INTO `shoplists` VALUES (7, '海底捞', '8db6264e350b33b881b282001.png', '便宜实惠又干净', '6');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `hobby` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (1, '夏至', 'https://img2.baidu.com/it/u=4136987256,283353262&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=520', '00000000000', '12321@qq.com', '1', 'xiazhi');
INSERT INTO `user_info` VALUES (2, '段玉', 'https://img2.baidu.com/it/u=4136987256,283353262&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=520', '11111111111', '12312@163.com', '28', 'duanyu');
INSERT INTO `user_info` VALUES (16, '亭丽', '444.jpg', '17712345678', '123456@qq.com', '吃吃喝喝', 'tingli');
INSERT INTO `user_info` VALUES (15, '小林', '666.jpg', '15512345678', '456@qq.com', '吃', 'xiaolin');
INSERT INTO `user_info` VALUES (10, '4444', NULL, '454515', '123@qq.com', '无', '444444');
INSERT INTO `user_info` VALUES (9, '张飞林', NULL, '18860439046', '1959782697@qq.com', '吃', 'feiling');
INSERT INTO `user_info` VALUES (8, '匡静静', '222.jpg', '865555', '195@qq.com', '哎呀11', 'jingjing');
INSERT INTO `user_info` VALUES (12, '张三', NULL, '17712345678', '123456@qq.com', '玩', 'zhangsan');
INSERT INTO `user_info` VALUES (14, '张希', NULL, '454515', '123@qq.com', '吃', 'zhangxi');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pass` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 54 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (46, '1111111', '12345678');
INSERT INTO `users` VALUES (45, 'xiaoxiao', '12345678');
INSERT INTO `users` VALUES (44, 'xiaozhan', '12341234');
INSERT INTO `users` VALUES (43, 'jingjing', '12345678');
INSERT INTO `users` VALUES (42, 'feiling', '12345678');
INSERT INTO `users` VALUES (40, '123456', '12345678');
INSERT INTO `users` VALUES (39, 'kaungjj', '12');
INSERT INTO `users` VALUES (38, '11234567', '1234');
INSERT INTO `users` VALUES (37, 'xiaoming', '12345');
INSERT INTO `users` VALUES (36, 'jing', '111');
INSERT INTO `users` VALUES (34, 'wenming', '123456');
INSERT INTO `users` VALUES (41, 'feiling', '12345678');
INSERT INTO `users` VALUES (47, '444444', '12345678');
INSERT INTO `users` VALUES (48, 'jingjing', '12345678');
INSERT INTO `users` VALUES (49, 'xiaoer', '12341234');
INSERT INTO `users` VALUES (50, 'zhangxi', '22222222');
INSERT INTO `users` VALUES (51, 'zhangsan', '22222222');
INSERT INTO `users` VALUES (52, 'xiaolin', '11111111');
INSERT INTO `users` VALUES (53, 'tingli', '12345678');

SET FOREIGN_KEY_CHECKS = 1;
