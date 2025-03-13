/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : booksinfo

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 13/03/2025 14:16:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for apilog
-- ----------------------------
DROP TABLE IF EXISTS `apilog`;
CREATE TABLE `apilog`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `params` json NOT NULL,
  `duration` double NOT NULL,
  `status_code` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `apiLog_user_id_94086cb4_fk_userinfo_id`(`user_id`) USING BTREE,
  CONSTRAINT `apiLog_user_id_94086cb4_fk_userinfo_id` FOREIGN KEY (`user_id`) REFERENCES `userinfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apilog
-- ----------------------------

-- ----------------------------
-- Table structure for auth_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_group
-- ----------------------------

-- ----------------------------
-- Table structure for auth_group_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE `auth_group_permissions`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_group_permissions_group_id_permission_id_0cd325b0_uniq`(`group_id`, `permission_id`) USING BTREE,
  INDEX `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm`(`permission_id`) USING BTREE,
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_group_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for auth_permission
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_permission_content_type_id_codename_01ab375a_uniq`(`content_type_id`, `codename`) USING BTREE,
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 77 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
INSERT INTO `auth_permission` VALUES (1, 'Can add permission', 1, 'add_permission');
INSERT INTO `auth_permission` VALUES (2, 'Can change permission', 1, 'change_permission');
INSERT INTO `auth_permission` VALUES (3, 'Can delete permission', 1, 'delete_permission');
INSERT INTO `auth_permission` VALUES (4, 'Can view permission', 1, 'view_permission');
INSERT INTO `auth_permission` VALUES (5, 'Can add group', 2, 'add_group');
INSERT INTO `auth_permission` VALUES (6, 'Can change group', 2, 'change_group');
INSERT INTO `auth_permission` VALUES (7, 'Can delete group', 2, 'delete_group');
INSERT INTO `auth_permission` VALUES (8, 'Can view group', 2, 'view_group');
INSERT INTO `auth_permission` VALUES (9, 'Can add content type', 3, 'add_contenttype');
INSERT INTO `auth_permission` VALUES (10, 'Can change content type', 3, 'change_contenttype');
INSERT INTO `auth_permission` VALUES (11, 'Can delete content type', 3, 'delete_contenttype');
INSERT INTO `auth_permission` VALUES (12, 'Can view content type', 3, 'view_contenttype');
INSERT INTO `auth_permission` VALUES (13, 'Can add session', 4, 'add_session');
INSERT INTO `auth_permission` VALUES (14, 'Can change session', 4, 'change_session');
INSERT INTO `auth_permission` VALUES (15, 'Can delete session', 4, 'delete_session');
INSERT INTO `auth_permission` VALUES (16, 'Can view session', 4, 'view_session');
INSERT INTO `auth_permission` VALUES (17, 'Can add experiment information', 5, 'add_experimentinformation');
INSERT INTO `auth_permission` VALUES (18, 'Can change experiment information', 5, 'change_experimentinformation');
INSERT INTO `auth_permission` VALUES (19, 'Can delete experiment information', 5, 'delete_experimentinformation');
INSERT INTO `auth_permission` VALUES (20, 'Can view experiment information', 5, 'view_experimentinformation');
INSERT INTO `auth_permission` VALUES (21, 'Can add material credentials', 6, 'add_materialcredentials');
INSERT INTO `auth_permission` VALUES (22, 'Can change material credentials', 6, 'change_materialcredentials');
INSERT INTO `auth_permission` VALUES (23, 'Can delete material credentials', 6, 'delete_materialcredentials');
INSERT INTO `auth_permission` VALUES (24, 'Can view material credentials', 6, 'view_materialcredentials');
INSERT INTO `auth_permission` VALUES (25, 'Can add sysmenu', 7, 'add_sysmenu');
INSERT INTO `auth_permission` VALUES (26, 'Can change sysmenu', 7, 'change_sysmenu');
INSERT INTO `auth_permission` VALUES (27, 'Can delete sysmenu', 7, 'delete_sysmenu');
INSERT INTO `auth_permission` VALUES (28, 'Can view sysmenu', 7, 'view_sysmenu');
INSERT INTO `auth_permission` VALUES (29, 'Can add syssetting', 8, 'add_syssetting');
INSERT INTO `auth_permission` VALUES (30, 'Can change syssetting', 8, 'change_syssetting');
INSERT INTO `auth_permission` VALUES (31, 'Can delete syssetting', 8, 'delete_syssetting');
INSERT INTO `auth_permission` VALUES (32, 'Can view syssetting', 8, 'view_syssetting');
INSERT INTO `auth_permission` VALUES (33, 'Can add userinfo', 9, 'add_userinfo');
INSERT INTO `auth_permission` VALUES (34, 'Can change userinfo', 9, 'change_userinfo');
INSERT INTO `auth_permission` VALUES (35, 'Can delete userinfo', 9, 'delete_userinfo');
INSERT INTO `auth_permission` VALUES (36, 'Can view userinfo', 9, 'view_userinfo');
INSERT INTO `auth_permission` VALUES (37, 'Can add sysuserinfo', 10, 'add_sysuserinfo');
INSERT INTO `auth_permission` VALUES (38, 'Can change sysuserinfo', 10, 'change_sysuserinfo');
INSERT INTO `auth_permission` VALUES (39, 'Can delete sysuserinfo', 10, 'delete_sysuserinfo');
INSERT INTO `auth_permission` VALUES (40, 'Can view sysuserinfo', 10, 'view_sysuserinfo');
INSERT INTO `auth_permission` VALUES (41, 'Can add material performance', 11, 'add_materialperformance');
INSERT INTO `auth_permission` VALUES (42, 'Can change material performance', 11, 'change_materialperformance');
INSERT INTO `auth_permission` VALUES (43, 'Can delete material performance', 11, 'delete_materialperformance');
INSERT INTO `auth_permission` VALUES (44, 'Can view material performance', 11, 'view_materialperformance');
INSERT INTO `auth_permission` VALUES (45, 'Can add material classiication', 12, 'add_materialclassiication');
INSERT INTO `auth_permission` VALUES (46, 'Can change material classiication', 12, 'change_materialclassiication');
INSERT INTO `auth_permission` VALUES (47, 'Can delete material classiication', 12, 'delete_materialclassiication');
INSERT INTO `auth_permission` VALUES (48, 'Can view material classiication', 12, 'view_materialclassiication');
INSERT INTO `auth_permission` VALUES (49, 'Can add material characterization', 13, 'add_materialcharacterization');
INSERT INTO `auth_permission` VALUES (50, 'Can change material characterization', 13, 'change_materialcharacterization');
INSERT INTO `auth_permission` VALUES (51, 'Can delete material characterization', 13, 'delete_materialcharacterization');
INSERT INTO `auth_permission` VALUES (52, 'Can view material characterization', 13, 'view_materialcharacterization');
INSERT INTO `auth_permission` VALUES (53, 'Can add django job', 14, 'add_djangojob');
INSERT INTO `auth_permission` VALUES (54, 'Can change django job', 14, 'change_djangojob');
INSERT INTO `auth_permission` VALUES (55, 'Can delete django job', 14, 'delete_djangojob');
INSERT INTO `auth_permission` VALUES (56, 'Can view django job', 14, 'view_djangojob');
INSERT INTO `auth_permission` VALUES (57, 'Can add django job execution', 15, 'add_djangojobexecution');
INSERT INTO `auth_permission` VALUES (58, 'Can change django job execution', 15, 'change_djangojobexecution');
INSERT INTO `auth_permission` VALUES (59, 'Can delete django job execution', 15, 'delete_djangojobexecution');
INSERT INTO `auth_permission` VALUES (60, 'Can view django job execution', 15, 'view_djangojobexecution');
INSERT INTO `auth_permission` VALUES (61, 'Can add borrow record', 16, 'add_borrowrecord');
INSERT INTO `auth_permission` VALUES (62, 'Can change borrow record', 16, 'change_borrowrecord');
INSERT INTO `auth_permission` VALUES (63, 'Can delete borrow record', 16, 'delete_borrowrecord');
INSERT INTO `auth_permission` VALUES (64, 'Can view borrow record', 16, 'view_borrowrecord');
INSERT INTO `auth_permission` VALUES (65, 'Can add api log', 17, 'add_apilog');
INSERT INTO `auth_permission` VALUES (66, 'Can change api log', 17, 'change_apilog');
INSERT INTO `auth_permission` VALUES (67, 'Can delete api log', 17, 'delete_apilog');
INSERT INTO `auth_permission` VALUES (68, 'Can view api log', 17, 'view_apilog');
INSERT INTO `auth_permission` VALUES (69, 'Can add notification', 18, 'add_notification');
INSERT INTO `auth_permission` VALUES (70, 'Can change notification', 18, 'change_notification');
INSERT INTO `auth_permission` VALUES (71, 'Can delete notification', 18, 'delete_notification');
INSERT INTO `auth_permission` VALUES (72, 'Can view notification', 18, 'view_notification');
INSERT INTO `auth_permission` VALUES (73, 'Can add book', 19, 'add_book');
INSERT INTO `auth_permission` VALUES (74, 'Can change book', 19, 'change_book');
INSERT INTO `auth_permission` VALUES (75, 'Can delete book', 19, 'delete_book');
INSERT INTO `auth_permission` VALUES (76, 'Can view book', 19, 'view_book');
INSERT INTO `auth_permission` VALUES (77, 'Can add crontab', 20, 'add_crontabschedule');
INSERT INTO `auth_permission` VALUES (78, 'Can change crontab', 20, 'change_crontabschedule');
INSERT INTO `auth_permission` VALUES (79, 'Can delete crontab', 20, 'delete_crontabschedule');
INSERT INTO `auth_permission` VALUES (80, 'Can view crontab', 20, 'view_crontabschedule');
INSERT INTO `auth_permission` VALUES (81, 'Can add interval', 21, 'add_intervalschedule');
INSERT INTO `auth_permission` VALUES (82, 'Can change interval', 21, 'change_intervalschedule');
INSERT INTO `auth_permission` VALUES (83, 'Can delete interval', 21, 'delete_intervalschedule');
INSERT INTO `auth_permission` VALUES (84, 'Can view interval', 21, 'view_intervalschedule');
INSERT INTO `auth_permission` VALUES (85, 'Can add periodic task', 22, 'add_periodictask');
INSERT INTO `auth_permission` VALUES (86, 'Can change periodic task', 22, 'change_periodictask');
INSERT INTO `auth_permission` VALUES (87, 'Can delete periodic task', 22, 'delete_periodictask');
INSERT INTO `auth_permission` VALUES (88, 'Can view periodic task', 22, 'view_periodictask');
INSERT INTO `auth_permission` VALUES (89, 'Can add periodic tasks', 23, 'add_periodictasks');
INSERT INTO `auth_permission` VALUES (90, 'Can change periodic tasks', 23, 'change_periodictasks');
INSERT INTO `auth_permission` VALUES (91, 'Can delete periodic tasks', 23, 'delete_periodictasks');
INSERT INTO `auth_permission` VALUES (92, 'Can view periodic tasks', 23, 'view_periodictasks');
INSERT INTO `auth_permission` VALUES (93, 'Can add solar event', 24, 'add_solarschedule');
INSERT INTO `auth_permission` VALUES (94, 'Can change solar event', 24, 'change_solarschedule');
INSERT INTO `auth_permission` VALUES (95, 'Can delete solar event', 24, 'delete_solarschedule');
INSERT INTO `auth_permission` VALUES (96, 'Can view solar event', 24, 'view_solarschedule');
INSERT INTO `auth_permission` VALUES (97, 'Can add clocked', 25, 'add_clockedschedule');
INSERT INTO `auth_permission` VALUES (98, 'Can change clocked', 25, 'change_clockedschedule');
INSERT INTO `auth_permission` VALUES (99, 'Can delete clocked', 25, 'delete_clockedschedule');
INSERT INTO `auth_permission` VALUES (100, 'Can view clocked', 25, 'view_clockedschedule');

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `author` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `publisher` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `publish_date` date NOT NULL,
  `total_copies` int UNSIGNED NOT NULL,
  `available_copies` int UNSIGNED NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (3, '水浒传', '施耐庵', '某某水浒传出版社', '2024-12-12', 1000, 1000, '2025-03-12 22:54:32.233142', '2025-03-12 22:54:32.233142');
INSERT INTO `book` VALUES (4, '三国演义', '罗贯中', '三国演义出版社', '2023-08-08', 5000, 4997, '2025-03-12 22:56:05.872703', '2025-03-12 23:55:49.846058');
INSERT INTO `book` VALUES (5, '西游记', '吴承恩', '西游记出版社', '2021-03-12', 100, 97, '2025-03-12 22:56:31.489812', '2025-03-12 23:55:42.640222');
INSERT INTO `book` VALUES (6, '红楼梦', '曹雪芹', '红楼梦出版社', '2025-03-12', 1000, 997, '2025-03-12 22:56:58.670680', '2025-03-13 13:55:02.796074');

-- ----------------------------
-- Table structure for borrowrecord
-- ----------------------------
DROP TABLE IF EXISTS `borrowrecord`;
CREATE TABLE `borrowrecord`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `borrow_date` datetime(6) NOT NULL,
  `due_date` datetime(6) NOT NULL,
  `return_date` datetime(6) NULL DEFAULT NULL,
  `status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `book_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `borrowrecord_book_id_57e95553_fk_book_id`(`book_id`) USING BTREE,
  INDEX `borrowrecord_user_id_3a6e987c_fk_userinfo_id`(`user_id`) USING BTREE,
  CONSTRAINT `borrowrecord_book_id_57e95553_fk_book_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `borrowrecord_user_id_3a6e987c_fk_userinfo_id` FOREIGN KEY (`user_id`) REFERENCES `userinfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of borrowrecord
-- ----------------------------
INSERT INTO `borrowrecord` VALUES (44, '2025-03-12 23:46:39.376541', '2025-03-15 23:46:39.000000', NULL, 'BORROWED', 6, 25);
INSERT INTO `borrowrecord` VALUES (45, '2025-03-12 23:54:07.679875', '2025-04-11 23:54:07.679875', NULL, 'BORROWED', 6, 1);
INSERT INTO `borrowrecord` VALUES (47, '2025-03-12 23:54:14.729322', '2025-03-18 23:54:14.000000', NULL, 'BORROWED', 5, 25);
INSERT INTO `borrowrecord` VALUES (51, '2025-03-12 23:55:42.642217', '2025-03-17 23:55:42.000000', NULL, 'BORROWED', 5, 1);
INSERT INTO `borrowrecord` VALUES (52, '2025-03-12 23:55:42.642217', '2025-04-11 23:55:42.641220', NULL, 'BORROWED', 5, 21);
INSERT INTO `borrowrecord` VALUES (53, '2025-03-12 23:55:49.848052', '2025-03-11 23:55:49.000000', NULL, 'BORROWED', 4, 1);
INSERT INTO `borrowrecord` VALUES (54, '2025-03-12 23:55:49.848052', '2025-04-11 23:55:49.847055', NULL, 'BORROWED', 4, 25);
INSERT INTO `borrowrecord` VALUES (55, '2025-03-12 23:55:49.848052', '2025-04-11 23:55:49.847055', NULL, 'BORROWED', 4, 23);
INSERT INTO `borrowrecord` VALUES (56, '2025-03-13 13:55:02.798069', '2025-04-12 13:55:02.798069', NULL, 'BORROWED', 6, 2);

-- ----------------------------
-- Table structure for django_apscheduler_djangojob
-- ----------------------------
DROP TABLE IF EXISTS `django_apscheduler_djangojob`;
CREATE TABLE `django_apscheduler_djangojob`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `next_run_time` datetime(6) NULL DEFAULT NULL,
  `job_state` longblob NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `django_apscheduler_djangojob_next_run_time_2f022619`(`next_run_time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of django_apscheduler_djangojob
-- ----------------------------
INSERT INTO `django_apscheduler_djangojob` VALUES ('my_scheduled_job', '2025-03-14 08:00:00.000000', 0x800495A9040000000000007D94288C0776657273696F6E944B018C026964948C106D795F7363686564756C65645F6A6F62948C0466756E63948C1A63656C6572792E6170702E7461736B3A5461736B2E64656C6179948C0774726967676572948C1961707363686564756C65722E74726967676572732E63726F6E948C0B43726F6E547269676765729493942981947D942868014B028C0874696D657A6F6E65948C1B7079747A5F6465707265636174696F6E5F7368696D2E5F696D706C948C09777261705F7A6F6E659493948C086275696C74696E73948C07676574617474729493948C126261636B706F7274732E7A6F6E65696E666F948C085A6F6E65496E666F9493948C095F756E7069636B6C6594869452948C0D417369612F5368616E67686169944B01869452946819869452948C0A73746172745F64617465944E8C08656E645F64617465944E8C066669656C6473945D94288C2061707363686564756C65722E74726967676572732E63726F6E2E6669656C6473948C09426173654669656C649493942981947D94288C046E616D65948C0479656172948C0A69735F64656661756C7494888C0B65787072657373696F6E73945D948C2561707363686564756C65722E74726967676572732E63726F6E2E65787072657373696F6E73948C0D416C6C45787072657373696F6E9493942981947D948C0473746570944E736261756268228C0A4D6F6E74684669656C649493942981947D942868278C056D6F6E746894682988682A5D94682E2981947D9468314E736261756268228C0F4461794F664D6F6E74684669656C649493942981947D942868278C0364617994682988682A5D94682E2981947D9468314E736261756268228C095765656B4669656C649493942981947D942868278C047765656B94682988682A5D94682E2981947D9468314E736261756268228C0E4461794F665765656B4669656C649493942981947D942868278C0B6461795F6F665F7765656B94682988682A5D94682E2981947D9468314E736261756268242981947D942868278C04686F757294682989682A5D94682C8C0F52616E676545787072657373696F6E9493942981947D942868314E8C056669727374944B088C046C617374944B08756261756268242981947D942868278C066D696E75746594682989682A5D9468572981947D942868314E685A4B00685B4B00756261756268242981947D942868278C067365636F6E6494682988682A5D9468572981947D942868314E685A4B00685B4B007562617562658C066A6974746572944E75628C086578656375746F72948C0764656661756C74948C0461726773948C1363656C6572792E6170702E7265676973747279948C115F756E7069636B6C655F7461736B5F76329493948C1A626F6F6B732E63656C6572792E706572696F6469635F7461736B948C0C626F6F6B732E63656C657279948694529485948C066B7761726773947D9468278C0A5461736B2E64656C6179948C126D6973666972655F67726163655F74696D65944B018C08636F616C6573636594888C0D6D61785F696E7374616E636573944B018C0D6E6578745F72756E5F74696D65948C086461746574696D65948C086461746574696D65949394430A07E9030E08000000000094681D86945294752E);

-- ----------------------------
-- Table structure for django_apscheduler_djangojobexecution
-- ----------------------------
DROP TABLE IF EXISTS `django_apscheduler_djangojobexecution`;
CREATE TABLE `django_apscheduler_djangojobexecution`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `run_time` datetime(6) NOT NULL,
  `duration` decimal(15, 2) NULL DEFAULT NULL,
  `finished` decimal(15, 2) NULL DEFAULT NULL,
  `exception` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `traceback` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `job_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `unique_job_executions`(`job_id`, `run_time`) USING BTREE,
  INDEX `django_apscheduler_djangojobexecution_run_time_16edd96b`(`run_time`) USING BTREE,
  CONSTRAINT `django_apscheduler_djangojobexecution_job_id_daf5090a_fk` FOREIGN KEY (`job_id`) REFERENCES `django_apscheduler_djangojob` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of django_apscheduler_djangojobexecution
-- ----------------------------
INSERT INTO `django_apscheduler_djangojobexecution` VALUES (1, 'Executed', '2025-03-13 11:02:00.000000', 0.53, 1741834920.53, NULL, NULL, 'my_scheduled_job');
INSERT INTO `django_apscheduler_djangojobexecution` VALUES (2, 'Executed', '2025-03-13 11:10:00.000000', 8.93, 1741835408.93, NULL, NULL, 'my_scheduled_job');
INSERT INTO `django_apscheduler_djangojobexecution` VALUES (3, 'Executed', '2025-03-13 12:46:00.000000', 8.79, 1741841168.79, NULL, NULL, 'my_scheduled_job');

-- ----------------------------
-- Table structure for django_celery_beat_clockedschedule
-- ----------------------------
DROP TABLE IF EXISTS `django_celery_beat_clockedschedule`;
CREATE TABLE `django_celery_beat_clockedschedule`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `clocked_time` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_celery_beat_clockedschedule
-- ----------------------------

-- ----------------------------
-- Table structure for django_celery_beat_crontabschedule
-- ----------------------------
DROP TABLE IF EXISTS `django_celery_beat_crontabschedule`;
CREATE TABLE `django_celery_beat_crontabschedule`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `minute` varchar(240) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `hour` varchar(96) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `day_of_week` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `day_of_month` varchar(124) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `month_of_year` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `timezone` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_celery_beat_crontabschedule
-- ----------------------------
INSERT INTO `django_celery_beat_crontabschedule` VALUES (1, '30', '10', '*', '*', '*', 'UTC');

-- ----------------------------
-- Table structure for django_celery_beat_intervalschedule
-- ----------------------------
DROP TABLE IF EXISTS `django_celery_beat_intervalschedule`;
CREATE TABLE `django_celery_beat_intervalschedule`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `every` int NOT NULL,
  `period` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_celery_beat_intervalschedule
-- ----------------------------

-- ----------------------------
-- Table structure for django_celery_beat_periodictask
-- ----------------------------
DROP TABLE IF EXISTS `django_celery_beat_periodictask`;
CREATE TABLE `django_celery_beat_periodictask`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `task` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `args` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `kwargs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `queue` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `exchange` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `routing_key` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `expires` datetime(6) NULL DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  `last_run_at` datetime(6) NULL DEFAULT NULL,
  `total_run_count` int UNSIGNED NOT NULL,
  `date_changed` datetime(6) NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `crontab_id` int NULL DEFAULT NULL,
  `interval_id` int NULL DEFAULT NULL,
  `solar_id` int NULL DEFAULT NULL,
  `one_off` tinyint(1) NOT NULL,
  `start_time` datetime(6) NULL DEFAULT NULL,
  `priority` int UNSIGNED NULL DEFAULT NULL,
  `headers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `clocked_id` int NULL DEFAULT NULL,
  `expire_seconds` int UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  INDEX `django_celery_beat_p_crontab_id_d3cba168_fk_django_ce`(`crontab_id`) USING BTREE,
  INDEX `django_celery_beat_p_interval_id_a8ca27da_fk_django_ce`(`interval_id`) USING BTREE,
  INDEX `django_celery_beat_p_solar_id_a87ce72c_fk_django_ce`(`solar_id`) USING BTREE,
  INDEX `django_celery_beat_p_clocked_id_47a69f82_fk_django_ce`(`clocked_id`) USING BTREE,
  CONSTRAINT `django_celery_beat_p_clocked_id_47a69f82_fk_django_ce` FOREIGN KEY (`clocked_id`) REFERENCES `django_celery_beat_clockedschedule` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `django_celery_beat_p_crontab_id_d3cba168_fk_django_ce` FOREIGN KEY (`crontab_id`) REFERENCES `django_celery_beat_crontabschedule` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `django_celery_beat_p_interval_id_a8ca27da_fk_django_ce` FOREIGN KEY (`interval_id`) REFERENCES `django_celery_beat_intervalschedule` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `django_celery_beat_p_solar_id_a87ce72c_fk_django_ce` FOREIGN KEY (`solar_id`) REFERENCES `django_celery_beat_solarschedule` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_celery_beat_periodictask
-- ----------------------------
INSERT INTO `django_celery_beat_periodictask` VALUES (1, 'Daily Periodic Task', 'books.celery.periodic_task', '[]', '{}', NULL, NULL, NULL, NULL, 1, NULL, 0, '2025-03-13 10:40:11.328310', '', 1, NULL, NULL, 0, NULL, NULL, '{}', NULL, NULL);

-- ----------------------------
-- Table structure for django_celery_beat_periodictasks
-- ----------------------------
DROP TABLE IF EXISTS `django_celery_beat_periodictasks`;
CREATE TABLE `django_celery_beat_periodictasks`  (
  `ident` smallint NOT NULL,
  `last_update` datetime(6) NOT NULL,
  PRIMARY KEY (`ident`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_celery_beat_periodictasks
-- ----------------------------
INSERT INTO `django_celery_beat_periodictasks` VALUES (1, '2025-03-13 10:40:11.325317');

-- ----------------------------
-- Table structure for django_celery_beat_solarschedule
-- ----------------------------
DROP TABLE IF EXISTS `django_celery_beat_solarschedule`;
CREATE TABLE `django_celery_beat_solarschedule`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `event` varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `latitude` decimal(9, 6) NOT NULL,
  `longitude` decimal(9, 6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `django_celery_beat_solar_event_latitude_longitude_ba64999a_uniq`(`event`, `latitude`, `longitude`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of django_celery_beat_solarschedule
-- ----------------------------

-- ----------------------------
-- Table structure for django_content_type
-- ----------------------------
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE `django_content_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `model` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `django_content_type_app_label_model_76bd3d3b_uniq`(`app_label`, `model`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of django_content_type
-- ----------------------------
INSERT INTO `django_content_type` VALUES (2, 'auth', 'group');
INSERT INTO `django_content_type` VALUES (1, 'auth', 'permission');
INSERT INTO `django_content_type` VALUES (17, 'books', 'apilog');
INSERT INTO `django_content_type` VALUES (19, 'books', 'book');
INSERT INTO `django_content_type` VALUES (16, 'books', 'borrowrecord');
INSERT INTO `django_content_type` VALUES (18, 'books', 'notification');
INSERT INTO `django_content_type` VALUES (3, 'contenttypes', 'contenttype');
INSERT INTO `django_content_type` VALUES (14, 'django_apscheduler', 'djangojob');
INSERT INTO `django_content_type` VALUES (15, 'django_apscheduler', 'djangojobexecution');
INSERT INTO `django_content_type` VALUES (25, 'django_celery_beat', 'clockedschedule');
INSERT INTO `django_content_type` VALUES (20, 'django_celery_beat', 'crontabschedule');
INSERT INTO `django_content_type` VALUES (21, 'django_celery_beat', 'intervalschedule');
INSERT INTO `django_content_type` VALUES (22, 'django_celery_beat', 'periodictask');
INSERT INTO `django_content_type` VALUES (23, 'django_celery_beat', 'periodictasks');
INSERT INTO `django_content_type` VALUES (24, 'django_celery_beat', 'solarschedule');
INSERT INTO `django_content_type` VALUES (4, 'sessions', 'session');
INSERT INTO `django_content_type` VALUES (5, 'SysModel', 'experimentinformation');
INSERT INTO `django_content_type` VALUES (13, 'SysModel', 'materialcharacterization');
INSERT INTO `django_content_type` VALUES (12, 'SysModel', 'materialclassiication');
INSERT INTO `django_content_type` VALUES (6, 'SysModel', 'materialcredentials');
INSERT INTO `django_content_type` VALUES (11, 'SysModel', 'materialperformance');
INSERT INTO `django_content_type` VALUES (7, 'SysModel', 'sysmenu');
INSERT INTO `django_content_type` VALUES (8, 'SysModel', 'syssetting');
INSERT INTO `django_content_type` VALUES (10, 'SysModel', 'sysuserinfo');
INSERT INTO `django_content_type` VALUES (9, 'SysModel', 'userinfo');

-- ----------------------------
-- Table structure for django_migrations
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
INSERT INTO `django_migrations` VALUES (1, 'contenttypes', '0001_initial', '2022-05-13 09:24:04.190644');
INSERT INTO `django_migrations` VALUES (2, 'contenttypes', '0002_remove_content_type_name', '2022-05-13 09:24:04.283068');
INSERT INTO `django_migrations` VALUES (3, 'auth', '0001_initial', '2022-05-13 09:24:04.619056');
INSERT INTO `django_migrations` VALUES (4, 'auth', '0002_alter_permission_name_max_length', '2022-05-13 09:24:04.700982');
INSERT INTO `django_migrations` VALUES (5, 'auth', '0003_alter_user_email_max_length', '2022-05-13 09:24:04.709597');
INSERT INTO `django_migrations` VALUES (6, 'auth', '0004_alter_user_username_opts', '2022-05-13 09:24:04.720568');
INSERT INTO `django_migrations` VALUES (7, 'auth', '0005_alter_user_last_login_null', '2022-05-13 09:24:04.729791');
INSERT INTO `django_migrations` VALUES (8, 'auth', '0006_require_contenttypes_0002', '2022-05-13 09:24:04.737768');
INSERT INTO `django_migrations` VALUES (9, 'auth', '0007_alter_validators_add_error_messages', '2022-05-13 09:24:04.746442');
INSERT INTO `django_migrations` VALUES (10, 'auth', '0008_alter_user_username_max_length', '2022-05-13 09:24:04.756051');
INSERT INTO `django_migrations` VALUES (11, 'auth', '0009_alter_user_last_name_max_length', '2022-05-13 09:24:04.768150');
INSERT INTO `django_migrations` VALUES (12, 'auth', '0010_alter_group_name_max_length', '2022-05-13 09:24:04.827152');
INSERT INTO `django_migrations` VALUES (13, 'auth', '0011_update_proxy_permissions', '2022-05-13 09:24:04.837678');
INSERT INTO `django_migrations` VALUES (14, 'auth', '0012_alter_user_first_name_max_length', '2022-05-13 09:24:04.846123');
INSERT INTO `django_migrations` VALUES (15, 'SysModel', '0001_initial', '2022-05-13 09:24:05.594654');
INSERT INTO `django_migrations` VALUES (16, 'django_apscheduler', '0001_initial', '2022-05-13 09:24:05.740231');
INSERT INTO `django_migrations` VALUES (17, 'django_apscheduler', '0002_auto_20180412_0758', '2022-05-13 09:24:05.792767');
INSERT INTO `django_migrations` VALUES (18, 'django_apscheduler', '0003_auto_20200716_1632', '2022-05-13 09:24:05.825390');
INSERT INTO `django_migrations` VALUES (19, 'django_apscheduler', '0004_auto_20200717_1043', '2022-05-13 09:24:06.026424');
INSERT INTO `django_migrations` VALUES (20, 'django_apscheduler', '0005_migrate_name_to_id', '2022-05-13 09:24:06.049139');
INSERT INTO `django_migrations` VALUES (21, 'django_apscheduler', '0006_remove_djangojob_name', '2022-05-13 09:24:06.100248');
INSERT INTO `django_migrations` VALUES (22, 'django_apscheduler', '0007_auto_20200717_1404', '2022-05-13 09:24:06.166310');
INSERT INTO `django_migrations` VALUES (23, 'django_apscheduler', '0008_remove_djangojobexecution_started', '2022-05-13 09:24:06.215993');
INSERT INTO `django_migrations` VALUES (24, 'django_apscheduler', '0009_djangojobexecution_unique_job_executions', '2022-05-13 09:24:06.242533');
INSERT INTO `django_migrations` VALUES (25, 'sessions', '0001_initial', '2022-05-13 09:24:06.289779');
INSERT INTO `django_migrations` VALUES (26, 'SysModel', '0002_alter_materialperformance_files', '2022-05-15 01:58:53.542558');
INSERT INTO `django_migrations` VALUES (27, 'SysModel', '0003_alter_materialclassiication_pid', '2025-03-12 16:56:19.847323');
INSERT INTO `django_migrations` VALUES (28, 'books', '0001_initial', '2025-03-12 16:56:20.264726');
INSERT INTO `django_migrations` VALUES (29, 'django_celery_beat', '0001_initial', '2025-03-13 10:38:49.418609');
INSERT INTO `django_migrations` VALUES (30, 'django_celery_beat', '0002_auto_20161118_0346', '2025-03-13 10:38:49.506788');
INSERT INTO `django_migrations` VALUES (31, 'django_celery_beat', '0003_auto_20161209_0049', '2025-03-13 10:38:49.537706');
INSERT INTO `django_migrations` VALUES (32, 'django_celery_beat', '0004_auto_20170221_0000', '2025-03-13 10:38:49.547256');
INSERT INTO `django_migrations` VALUES (33, 'django_celery_beat', '0005_add_solarschedule_events_choices', '2025-03-13 10:38:49.554574');
INSERT INTO `django_migrations` VALUES (34, 'django_celery_beat', '0006_auto_20180322_0932', '2025-03-13 10:38:49.632153');
INSERT INTO `django_migrations` VALUES (35, 'django_celery_beat', '0007_auto_20180521_0826', '2025-03-13 10:38:49.683117');
INSERT INTO `django_migrations` VALUES (36, 'django_celery_beat', '0008_auto_20180914_1922', '2025-03-13 10:38:49.702418');
INSERT INTO `django_migrations` VALUES (37, 'django_celery_beat', '0006_auto_20180210_1226', '2025-03-13 10:38:49.714990');
INSERT INTO `django_migrations` VALUES (38, 'django_celery_beat', '0006_periodictask_priority', '2025-03-13 10:38:49.787387');
INSERT INTO `django_migrations` VALUES (39, 'django_celery_beat', '0009_periodictask_headers', '2025-03-13 10:38:49.906702');
INSERT INTO `django_migrations` VALUES (40, 'django_celery_beat', '0010_auto_20190429_0326', '2025-03-13 10:38:50.011783');
INSERT INTO `django_migrations` VALUES (41, 'django_celery_beat', '0011_auto_20190508_0153', '2025-03-13 10:38:50.112757');
INSERT INTO `django_migrations` VALUES (42, 'django_celery_beat', '0012_periodictask_expire_seconds', '2025-03-13 10:38:50.187038');
INSERT INTO `django_migrations` VALUES (43, 'django_celery_beat', '0013_auto_20200609_0727', '2025-03-13 10:38:50.193989');
INSERT INTO `django_migrations` VALUES (44, 'django_celery_beat', '0014_remove_clockedschedule_enabled', '2025-03-13 10:38:50.226919');
INSERT INTO `django_migrations` VALUES (45, 'django_celery_beat', '0015_edit_solarschedule_events_choices', '2025-03-13 10:38:50.233900');

-- ----------------------------
-- Table structure for django_session
-- ----------------------------
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE `django_session`  (
  `session_key` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `session_data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`) USING BTREE,
  INDEX `django_session_expire_date_a5c62663`(`expire_date`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of django_session
-- ----------------------------

-- ----------------------------
-- Table structure for experiment_information
-- ----------------------------
DROP TABLE IF EXISTS `experiment_information`;
CREATE TABLE `experiment_information`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `experiment_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `place` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `unit` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `experimenters` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `device_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `device_model` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `device_parameters` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `standard_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `files` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `experimental_parameters` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start_time` datetime(6) NULL DEFAULT NULL,
  `end_time` datetime(6) NULL DEFAULT NULL,
  `material_id` int NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `creator` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of experiment_information
-- ----------------------------

-- ----------------------------
-- Table structure for material_characterization
-- ----------------------------
DROP TABLE IF EXISTS `material_characterization`;
CREATE TABLE `material_characterization`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `characterization_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `characterization_value` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `creator` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `experimental_id_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `material_characteriz_experimental_id_id_39824efd_fk_experimen`(`experimental_id_id`) USING BTREE,
  CONSTRAINT `material_characteriz_experimental_id_id_39824efd_fk_experimen` FOREIGN KEY (`experimental_id_id`) REFERENCES `experiment_information` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of material_characterization
-- ----------------------------

-- ----------------------------
-- Table structure for material_credentials
-- ----------------------------
DROP TABLE IF EXISTS `material_credentials`;
CREATE TABLE `material_credentials`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `material_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `material_type` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `trademark` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `prepare_batches` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `additional_notes` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `preparation_process` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sample_status` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `component_table` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `creator` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of material_credentials
-- ----------------------------

-- ----------------------------
-- Table structure for material_performance
-- ----------------------------
DROP TABLE IF EXISTS `material_performance`;
CREATE TABLE `material_performance`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `performance_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `performance_value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `files` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `create_date` datetime(6) NOT NULL,
  `creator` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `experimental_id_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `material_performance_experimental_id_id_d7b5d3b8_fk_experimen`(`experimental_id_id`) USING BTREE,
  CONSTRAINT `material_performance_experimental_id_id_d7b5d3b8_fk_experimen` FOREIGN KEY (`experimental_id_id`) REFERENCES `experiment_information` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of material_performance
-- ----------------------------

-- ----------------------------
-- Table structure for materialclassiication
-- ----------------------------
DROP TABLE IF EXISTS `materialclassiication`;
CREATE TABLE `materialclassiication`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ClassificationName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdate` datetime(6) NOT NULL,
  `createTor` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `path` varchar(240) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pid_id` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ClassificationName`(`ClassificationName`) USING BTREE,
  INDEX `MaterialClassiicatio_pid_id_923c0a9e_fk_MaterialC`(`pid_id`) USING BTREE,
  CONSTRAINT `MaterialClassiicatio_pid_id_923c0a9e_fk_MaterialC` FOREIGN KEY (`pid_id`) REFERENCES `materialclassiication` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of materialclassiication
-- ----------------------------


-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `notification_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `related_record_id` bigint NULL DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `notification_related_record_id_b54ddc82_fk_borrowrecord_id`(`related_record_id`) USING BTREE,
  INDEX `notification_user_id_1002fc38_fk_userinfo_id`(`user_id`) USING BTREE,
  CONSTRAINT `notification_related_record_id_b54ddc82_fk_borrowrecord_id` FOREIGN KEY (`related_record_id`) REFERENCES `borrowrecord` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `notification_user_id_1002fc38_fk_userinfo_id` FOREIGN KEY (`user_id`) REFERENCES `userinfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notification
-- ----------------------------

-- ----------------------------
-- Table structure for sysmenu
-- ----------------------------
DROP TABLE IF EXISTS `sysmenu`;
CREATE TABLE `sysmenu`  (
  `MenuId` int NOT NULL AUTO_INCREMENT,
  `MenuName` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MenuUrl` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MenuStatus` int NOT NULL,
  `MenuParentId` int NOT NULL,
  `CreateDate` datetime(6) NOT NULL,
  `Creator` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `OrderField` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `IsAdmin` int NOT NULL,
  `Icon` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`MenuId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sysmenu
-- ----------------------------
INSERT INTO `sysmenu` VALUES (2, '系统设置', '#', 1, 0, '2021-05-11 10:18:06.000000', 'admin', '006', 1, 'fa-cogs');
INSERT INTO `sysmenu` VALUES (4, '用户管理', '/user', 1, 2, '2021-05-11 10:20:52.000000', 'admin', '001', 1, 'fa-user');
INSERT INTO `sysmenu` VALUES (7, '菜单模块设置', '/menumodule', 1, 2, '2021-05-11 10:33:23.000000', 'admin', '005', 1, 'fa-sitemap');
INSERT INTO `sysmenu` VALUES (19, '图书馆', 'books', 1, 0, '2025-03-12 16:15:25.305286', 'admin', '001', 1, 'fa fa-search');

-- ----------------------------
-- Table structure for syssetting
-- ----------------------------
DROP TABLE IF EXISTS `syssetting`;
CREATE TABLE `syssetting`  (
  `SetId` int NOT NULL AUTO_INCREMENT,
  `SetValue` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SetName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `SetType` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdate` datetime(6) NOT NULL,
  `IsEdit` int NOT NULL,
  `Creator` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `UseState` smallint NOT NULL,
  `Color` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`SetId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of syssetting
-- ----------------------------


-- ----------------------------
-- Table structure for sysuserinfo
-- ----------------------------
DROP TABLE IF EXISTS `sysuserinfo`;
CREATE TABLE `sysuserinfo`  (
  `UId` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `UserSex` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `DepName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Phone` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Note` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `accountid` bigint NOT NULL,
  PRIMARY KEY (`UId`) USING BTREE,
  INDEX `sysuserinfo_accountid_9ee85dbf_fk_userinfo_id`(`accountid`) USING BTREE,
  CONSTRAINT `sysuserinfo_accountid_9ee85dbf_fk_userinfo_id` FOREIGN KEY (`accountid`) REFERENCES `userinfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sysuserinfo
-- ----------------------------
INSERT INTO `sysuserinfo` VALUES (11, '', '', '', '', '', 20);
INSERT INTO `sysuserinfo` VALUES (12, '123456', '', '', '', '', 21);
INSERT INTO `sysuserinfo` VALUES (14, '', '', '', '', '', 23);
INSERT INTO `sysuserinfo` VALUES (15, '', '', '', '', '', 24);
INSERT INTO `sysuserinfo` VALUES (16, '', '', '', '', '', 25);
INSERT INTO `sysuserinfo` VALUES (17, '', '', '', '', '', 1);

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_login` datetime(6) NULL DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `first_name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `Creator` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (1, 'pbkdf2_sha256$260000$p83gx2hRP4nrLgPKpMfQov$exuc/T3vIZ73dXb00Mf5x1IFMuCemRJT4baFSt5M3JA=', '2025-03-13 13:54:49.107586', 1, 'admin', '', '', '3110385493@qq.com', 0, 1, '2021-09-02 17:01:07.099594', '');
INSERT INTO `userinfo` VALUES (2, 'pbkdf2_sha256$260000$IuYYTH26psniccDMDosWil$D6Od6qiQmnP1cgk5wIElGXXfssLdrN0op66TxXfHbrE=', '2022-06-06 17:26:31.777843', 0, '123456', '', '', '', 0, 1, '2022-02-23 16:45:08.145439', '');
INSERT INTO `userinfo` VALUES (20, 'pbkdf2_sha256$260000$xcufBHmTsuVDiVt5vS1BiB$8Goz1BqTFSuB8TwLJMklaX0yAL9KP4NWnyjwEe8lbn8=', '2022-05-31 10:18:33.269856', 0, 'zxcvb', '', '', '231321@qq.com', 1, 1, '2022-05-31 10:16:34.458653', '');
INSERT INTO `userinfo` VALUES (21, 'pbkdf2_sha256$260000$zg0m2rFhrxno1OC8rUwMCe$knnevOSJMRZ5PujYz/IRD9+3+FRutKOAEYwGOV/IjkM=', '2022-06-06 10:29:01.368635', 1, 'qwert', '', '', '1312@qq.com', 0, 1, '2022-06-06 10:27:58.090828', '');
INSERT INTO `userinfo` VALUES (23, 'pbkdf2_sha256$260000$3XJ44f9NiCtliew8x1pWQh$pSPwjzXOVOdMlaIpINCT/TeKnU5n9T34DGCKVi8tK8g=', '2022-06-06 10:30:58.814724', 1, 'asdfg', '', '', '1651@qq.com', 1, 1, '2022-06-06 10:30:52.346779', '');
INSERT INTO `userinfo` VALUES (24, 'pbkdf2_sha256$260000$JzYnH3Euijb5XTd4Ga9RpF$IsJt1Ea6HFUksAzdfvaN5UdfCX4TrDVRieDhGQj4+9Q=', '2022-06-06 17:37:29.127019', 0, 'qazws', '', '', '3322@qq.com', 1, 1, '2022-06-06 17:36:35.372070', '');
INSERT INTO `userinfo` VALUES (25, 'pbkdf2_sha256$260000$xkpIvRFhQ9cfSHNpRpLnuq$eqJG8vj0CPSE/FzYJvNWZfoJqHC+T4U/TXHOB9eMu/A=', '2022-06-09 14:51:16.225709', 1, 'admin1', '', '', '13213@qq.com', 0, 1, '2022-06-09 14:49:04.276391', '');

-- ----------------------------
-- Table structure for userinfo_groups
-- ----------------------------
DROP TABLE IF EXISTS `userinfo_groups`;
CREATE TABLE `userinfo_groups`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userinfo_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `userinfo_groups_userinfo_id_group_id_09f6287f_uniq`(`userinfo_id`, `group_id`) USING BTREE,
  INDEX `userinfo_groups_group_id_2b0a44d3_fk_auth_group_id`(`group_id`) USING BTREE,
  CONSTRAINT `userinfo_groups_group_id_2b0a44d3_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `userinfo_groups_userinfo_id_372a8337_fk_userinfo_id` FOREIGN KEY (`userinfo_id`) REFERENCES `userinfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of userinfo_groups
-- ----------------------------

-- ----------------------------
-- Table structure for userinfo_user_permissions
-- ----------------------------
DROP TABLE IF EXISTS `userinfo_user_permissions`;
CREATE TABLE `userinfo_user_permissions`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userinfo_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `userinfo_user_permission_userinfo_id_permission_i_58a5b892_uniq`(`userinfo_id`, `permission_id`) USING BTREE,
  INDEX `userinfo_user_permis_permission_id_a4a73f0e_fk_auth_perm`(`permission_id`) USING BTREE,
  CONSTRAINT `userinfo_user_permis_permission_id_a4a73f0e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `userinfo_user_permissions_userinfo_id_ed921e89_fk_userinfo_id` FOREIGN KEY (`userinfo_id`) REFERENCES `userinfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of userinfo_user_permissions
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
