# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.18)
# Database: rbac
# Generation Time: 2017-05-01 13:34:50 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table apply_vacate
# ------------------------------------------------------------

DROP TABLE IF EXISTS `apply_vacate`;

CREATE TABLE `apply_vacate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `phoneNum` int(11) DEFAULT NULL,
  `descrition` varchar(255) DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT NULL,
  `leaderIdea` varchar(255) DEFAULT NULL,
  `leaderOperation` int(11) DEFAULT NULL,
  `hrIdea` varchar(255) DEFAULT NULL,
  `hrOperation` int(11) DEFAULT NULL,
  `beginDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table attendance
# ------------------------------------------------------------

DROP TABLE IF EXISTS `attendance`;

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `checkDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int(11) DEFAULT NULL,
  `checkCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table datadic
# ------------------------------------------------------------

DROP TABLE IF EXISTS `datadic`;

CREATE TABLE `datadic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) DEFAULT NULL,
  `ddCode` int(255) DEFAULT NULL,
  `ddName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `datadic` WRITE;
/*!40000 ALTER TABLE `datadic` DISABLE KEYS */;

INSERT INTO `datadic` (`id`, `keyword`, `ddCode`, `ddName`)
VALUES
	(1,'假期类型',1,'年假'),
	(2,'假期类型',2,'病假'),
	(3,'假期类型',3,'婚假'),
	(4,'假期类型',4,'事假'),
	(5,'假期类型',5,'产假'),
	(6,'假期类型',6,'丧假'),
	(7,'假期类型',7,'工伤'),
	(8,'假期类型',8,'陪产假'),
	(9,'假期类型',9,'哺乳假'),
	(10,'假期类型',10,'产检假'),
	(11,'假期类型',11,'加班转调休'),
	(12,'假期类型',12,'福利带薪假'),
	(13,'操作类型',1,'批准'),
	(14,'操作类型',2,'驳回'),
	(15,'假期类型',13,'补签到'),
	(16,'审核状态',1,'部门经理审核中'),
	(17,'审核状态',2,'hr审核中'),
	(18,'审核状态',3,'hr经理审核中'),
	(19,'审核状态',4,'已完成'),
	(20,'审核状态',5,'hr审核不通过'),
	(21,'审核状态',6,'hr经理审核不通过');

/*!40000 ALTER TABLE `datadic` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table department
# ------------------------------------------------------------

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;

INSERT INTO `department` (`id`, `name`)
VALUES
	(1,'人力资源'),
	(2,'技术部'),
	(3,'运营部'),
	(4,'销售部');

/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table privilege
# ------------------------------------------------------------

DROP TABLE IF EXISTS `privilege`;

CREATE TABLE `privilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `privilege` WRITE;
/*!40000 ALTER TABLE `privilege` DISABLE KEYS */;

INSERT INTO `privilege` (`id`, `pid`, `name`, `url`)
VALUES
	(1,'0','个人信息',NULL),
	(2,'1','name',NULL),
	(3,'1','password',NULL),
	(4,'1','birthday',NULL),
	(5,'1','address',NULL),
	(6,'1','sex',NULL),
	(7,'1','idnum',NULL),
	(8,'1','buName',NULL),
	(9,'1','phoneNum',NULL),
	(10,'1','roleName',NULL),
	(11,'1','image',NULL),
	(12,'0','请假审批模块',NULL),
	(13,'12','提交',NULL),
	(14,'12','批准',NULL),
	(15,'12','驳回',NULL),
	(16,'12','废弃',NULL),
	(17,'1','registerTime',NULL),
	(18,'1','logName',NULL),
	(19,'1','email',NULL),
	(20,'1','workNo',NULL);

/*!40000 ALTER TABLE `privilege` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table privilege_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `privilege_user`;

CREATE TABLE `privilege_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `privilegeId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `buId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `privilege_user` WRITE;
/*!40000 ALTER TABLE `privilege_user` DISABLE KEYS */;

INSERT INTO `privilege_user` (`id`, `privilegeId`, `roleId`, `buId`)
VALUES
	(1,2,2,1),
	(2,3,2,1),
	(30,4,2,1),
	(42,5,2,1),
	(43,6,2,1),
	(44,7,2,1),
	(45,8,2,1),
	(46,9,2,1),
	(47,10,2,1),
	(48,11,2,1),
	(49,13,2,1),
	(50,14,2,1),
	(51,15,2,1),
	(52,16,2,1),
	(53,11,2,2),
	(54,13,2,2),
	(55,14,2,2),
	(56,15,2,2),
	(57,16,2,2),
	(58,11,2,3),
	(59,13,2,3),
	(60,14,2,3),
	(61,15,2,3),
	(62,16,2,3),
	(63,11,2,4),
	(64,13,2,4),
	(65,14,2,4),
	(66,15,2,4),
	(67,16,2,4),
	(68,3,1,4),
	(69,5,1,4),
	(70,9,1,4),
	(71,11,1,4),
	(72,16,1,4),
	(73,13,1,4),
	(74,3,1,3),
	(75,5,1,3),
	(76,9,1,3),
	(77,11,1,3),
	(78,16,1,3),
	(79,13,1,3),
	(80,3,1,2),
	(81,5,1,2),
	(82,9,1,2),
	(83,11,1,2),
	(84,16,1,2),
	(85,13,1,2),
	(86,2,1,1),
	(87,3,1,1),
	(88,4,1,1),
	(89,5,1,1),
	(90,7,1,1),
	(91,9,1,1),
	(92,11,1,1),
	(93,13,1,1),
	(94,16,1,1),
	(95,15,1,1),
	(96,14,1,1),
	(97,3,2,2),
	(98,5,2,2),
	(99,9,2,2),
	(100,11,2,2),
	(101,13,2,2),
	(102,16,2,2),
	(103,3,2,3),
	(104,5,2,3),
	(105,9,2,3),
	(106,11,2,3),
	(107,13,2,3),
	(108,16,2,3),
	(109,3,2,4),
	(110,5,2,4),
	(111,9,2,4),
	(112,11,2,4),
	(113,13,2,4),
	(114,16,2,4);

/*!40000 ALTER TABLE `privilege_user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;

INSERT INTO `role` (`id`, `name`)
VALUES
	(1,'员工'),
	(2,'经理');

/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `name`, `roleName`, `logName`, `password`, `workNo`, `email`, `address`, `birthday`, `sex`, `buName`, `idnum`, `image`, `phoneNum`, `registerTime`, `roleId`, `buId`)
VALUES
	(1,'杜俊芝','人力专员','djz','222','101','139@qq.com','北京','1996-12-09 00:00:00','女','人力资源','48873633782290876',NULL,'13885548481','2017-09-18 00:00:00',1,1),
	(2,'吴方兵','前端开发','wfb','111','201','1142@qq.com','贵州','1995-10-07 00:00:00','男','技术部','522622199510070179','','18585515021','2017-04-12 00:00:00',2,2),
	(3,'管理员','人力经理','admin','root','102','123@qq.com','西安','1997-02-10 00:00:00','女','人力资源','277483297482374883',NULL,'16382279330','2016-08-18 00:00:00',2,1),
	(4,'田斌','后台开发','tm','333','202','321@qq.com','灯塔','1995-10-08 00:00:00','男','技术部','766388392839489393',NULL,'16257782990','2015-03-20 00:00:00',1,2),
	(5,'李波','运营专员','lb','444','301','000@qq.com','汉中','1995-10-07 00:00:00','男','运营部','323118392839489393',NULL,'15596827782','2015-05-20 00:00:00',1,3),
	(6,'雷太斌','运营经理','lb','555','302','000@qq.com','西安','1995-09-07 00:00:00','男','运营部','323118392839489393',NULL,'15596827723','2015-05-20 00:00:00',2,3),
	(7,'杨金路','销售员','yjl','666','401','432@qq.com','黄平','1994-09-07 00:00:00','男','销售部','323113292839489393',NULL,'15596827723','2015-09-20 00:00:00',1,4),
	(8,'潘家静','销售员经理','pjj','777','402','432@qq.com','黄平','1993-09-07 00:00:00','女','销售部','323113292839489393',NULL,'15596827723','2015-09-09 00:00:00',2,4);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
