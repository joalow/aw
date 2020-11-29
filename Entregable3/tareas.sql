CREATE TABLE user (
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  img varchar(100) DEFAULT NULL,
  PRIMARY KEY (email)
);

CREATE TABLE task (
  id int(11) NOT NULL AUTO_INCREMENT,
  user varchar(100) NOT NULL,
  text text NOT NULL,
  done tinyint(1) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user)
      REFERENCES user (email)
);

CREATE TABLE tag (
  taskId int(11) NOT NULL AUTO_INCREMENT,
  tag varchar(100) NOT NULL,
  PRIMARY KEY (taskId,tag),
  FOREIGN KEY (taskId)
      REFERENCES task (id)
);

