package com.wfb.rbac.db.entity;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "datadic", schema = "rbac", catalog = "")
public class DataDicEntity {
    private Integer id;
    private String keyword;
    private Integer ddCode;
    private String ddName;

    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Integer getDdCode() {
        return ddCode;
    }

    public void setDdCode(Integer ddCode) {
        this.ddCode = ddCode;
    }

    public String getDdName() {
        return ddName;
    }

    public void setDdName(String ddName) {
        this.ddName = ddName;
    }
}
