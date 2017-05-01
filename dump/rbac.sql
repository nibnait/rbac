/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50600
Source Host           : 127.0.0.1:3306
Source Database       : rbac

Target Server Type    : MYSQL
Target Server Version : 50600
File Encoding         : 65001

Date: 2017-04-22 01:27:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for apply_vacate
-- ----------------------------
DROP TABLE IF EXISTS `apply_vacate`;
CREATE TABLE `apply_vacate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `phoneNum` int(11) DEFAULT NULL,
  `descrition` varchar(255) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT NULL,
  `leaderIdea` varchar(255) DEFAULT NULL,
  `leaderOperation` int(11) DEFAULT NULL,
  `hrIdea` varchar(255) DEFAULT NULL,
  `hrOperation` int(11) DEFAULT NULL,
  `beginDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of apply_vacate
-- ----------------------------

-- ----------------------------
-- Table structure for attendance
-- ----------------------------
DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `checkDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int(11) DEFAULT NULL,
  `checkCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of attendance
-- ----------------------------

-- ----------------------------
-- Table structure for datadic
-- ----------------------------
DROP TABLE IF EXISTS `datadic`;
CREATE TABLE `datadic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) DEFAULT NULL,
  `ddCode` int(255) DEFAULT NULL,
  `ddName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of datadic
-- ----------------------------
INSERT INTO `datadic` VALUES ('1', '假期类型', '1', '年假');
INSERT INTO `datadic` VALUES ('2', '假期类型', '2', '病假');
INSERT INTO `datadic` VALUES ('3', '假期类型', '3', '婚假');
INSERT INTO `datadic` VALUES ('4', '假期类型', '4', '事假');
INSERT INTO `datadic` VALUES ('5', '假期类型', '5', '产假');
INSERT INTO `datadic` VALUES ('6', '假期类型', '6', '丧假');
INSERT INTO `datadic` VALUES ('7', '假期类型', '7', '工伤');
INSERT INTO `datadic` VALUES ('8', '假期类型', '8', '陪产假');
INSERT INTO `datadic` VALUES ('9', '假期类型', '9', '哺乳假');
INSERT INTO `datadic` VALUES ('10', '假期类型', '10', '产检假');
INSERT INTO `datadic` VALUES ('11', '假期类型', '11', '加班转调休');
INSERT INTO `datadic` VALUES ('12', '假期类型', '12', '福利带薪假');
INSERT INTO `datadic` VALUES ('13', '操作类型', '1', '批准');
INSERT INTO `datadic` VALUES ('14', '操作类型', '2', '驳回');
INSERT INTO `datadic` VALUES ('15', '假期类型', '13', '补签到');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('1', '人力资源');
INSERT INTO `department` VALUES ('2', '技术部');
INSERT INTO `department` VALUES ('3', '运营部');
INSERT INTO `department` VALUES ('4', '销售部');

-- ----------------------------
-- Table structure for privilege
-- ----------------------------
DROP TABLE IF EXISTS `privilege`;
CREATE TABLE `privilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of privilege
-- ----------------------------
INSERT INTO `privilege` VALUES ('1', '0', '个人信息', null);
INSERT INTO `privilege` VALUES ('2', '1', 'name', null);
INSERT INTO `privilege` VALUES ('3', '1', 'password', null);
INSERT INTO `privilege` VALUES ('4', '1', 'birthday', null);
INSERT INTO `privilege` VALUES ('5', '1', 'address', null);
INSERT INTO `privilege` VALUES ('6', '1', 'sex', null);
INSERT INTO `privilege` VALUES ('7', '1', 'idnum', null);
INSERT INTO `privilege` VALUES ('8', '1', 'buName', null);
INSERT INTO `privilege` VALUES ('9', '1', 'phoneNum', null);
INSERT INTO `privilege` VALUES ('10', '1', 'roleName', null);
INSERT INTO `privilege` VALUES ('11', '1', 'image', null);

-- ----------------------------
-- Table structure for privilege_user
-- ----------------------------
DROP TABLE IF EXISTS `privilege_user`;
CREATE TABLE `privilege_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `privilegeId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of privilege_user
-- ----------------------------
INSERT INTO `privilege_user` VALUES ('1', '11', '1');
INSERT INTO `privilege_user` VALUES ('2', '2', '1');
INSERT INTO `privilege_user` VALUES ('3', '3', '1');
INSERT INTO `privilege_user` VALUES ('4', '4', '1');
INSERT INTO `privilege_user` VALUES ('5', '5', '1');
INSERT INTO `privilege_user` VALUES ('6', '6', '1');
INSERT INTO `privilege_user` VALUES ('7', '7', '1');
INSERT INTO `privilege_user` VALUES ('8', '8', '1');
INSERT INTO `privilege_user` VALUES ('9', '9', '1');
INSERT INTO `privilege_user` VALUES ('10', '10', '1');
INSERT INTO `privilege_user` VALUES ('11', '3', '2');
INSERT INTO `privilege_user` VALUES ('12', '4', '2');
INSERT INTO `privilege_user` VALUES ('13', '5', '2');
INSERT INTO `privilege_user` VALUES ('14', '6', '2');
INSERT INTO `privilege_user` VALUES ('15', '9', '2');
INSERT INTO `privilege_user` VALUES ('16', '11', '2');
INSERT INTO `privilege_user` VALUES ('17', '3', '3');
INSERT INTO `privilege_user` VALUES ('18', '4', '3');
INSERT INTO `privilege_user` VALUES ('19', '5', '3');
INSERT INTO `privilege_user` VALUES ('20', '6', '3');
INSERT INTO `privilege_user` VALUES ('21', '9', '3');
INSERT INTO `privilege_user` VALUES ('22', '11', '3');
INSERT INTO `privilege_user` VALUES ('23', '3', '4');
INSERT INTO `privilege_user` VALUES ('24', '4', '4');
INSERT INTO `privilege_user` VALUES ('25', '5', '4');
INSERT INTO `privilege_user` VALUES ('26', '6', '4');
INSERT INTO `privilege_user` VALUES ('27', '9', '4');
INSERT INTO `privilege_user` VALUES ('28', '11', '4');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '人力资源专员');
INSERT INTO `role` VALUES ('2', '正式员工');
INSERT INTO `role` VALUES ('3', '部门经理');
INSERT INTO `role` VALUES ('4', '实习生');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `roleName` varchar(255) DEFAULT NULL,
  `logName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `workNo` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `buName` varchar(255) DEFAULT NULL,
  `idnum` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `phoneNum` varchar(255) DEFAULT NULL,
  `registerTime` datetime DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `buId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'root', null, 'admin', 'root', null, null, null, null, null, null, null, null, null, null, '1', '1');
INSERT INTO `user` VALUES ('2', '吴方兵', null, 'wfb', '111', null, null, null, null, null, null, null, null, null, null, '2', '2');
INSERT INTO `user` VALUES ('4', null, null, 'åå', null, null, null, null, null, null, null, null, null, null, '2017-04-22 01:01:57', '3', '3');
