package com.wfb.rbac.db.dao;


import com.wfb.rbac.common.page.PageModel;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;


public class HibernateBaseDao<T>{

    protected static final String SELECT_HQL = "from %s obj where obj.%s=:para";
    protected static final String SELECT_ALL_HQL = "from %s obj";
    protected static SessionFactory sessionFactory;
    protected static Session session;
    protected String TableName;
    protected String IdFieldName;

    public HibernateBaseDao() {
    }

    /**
     * 初始化
     *
     * @param tableName Entity类
     * @param idFieldName   主键名
     */
    public HibernateBaseDao(Class tableName, String idFieldName){
        getSessionFactory();
        session = sessionFactory.openSession();
        TableName = tableName.getSimpleName();
        IdFieldName = idFieldName;
    }

    public boolean insert(T entity) {
        ensureSession();
        if (entity == null) {
            return false;
        }
        try {
            session.save(entity);
            doTransaction();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            session.close();
        }
        return true;
    }

    public boolean update(T entity) {
        ensureSession();
        if (entity == null) {
            return false;
        }
        try {
            session.update(entity);
            doTransaction();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            session.close();
        }
        return true;
    }

    public void delete(T entity) {
        ensureSession();
        if (entity == null) {
            return;
        }
        session.delete(entity);
        doTransaction();
    }

    @SuppressWarnings("unchecked")
    public T findBy(String field, Object param) {
        ensureSession();
        if (param == null) {
            return null;
        }
        Object result;
        try {
            Query query = session.createQuery(String.format(SELECT_HQL, TableName, field));
            query.setParameter("para", param);
            result = query.uniqueResult();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            session.close();
        }
        if (null == result) {
            return null;
        }
        return (T) result;
    }

    @SuppressWarnings("unchecked")
    public List<T> findAllBy(String field, Object param) {
        ensureSession();
        if (param == null) {
            return null;
        }
        List result;
        try {
            Query query = session.createQuery(String.format(SELECT_HQL, TableName, field));
            query.setParameter("para", param);
            result = query.list();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            session.close();
        }
        if (null == result) {
            return null;
        }
        return (List<T>) result;
    }

    public T findById(String id) {
        return findBy(IdFieldName, id);
    }

    public List<T> findAllWithPage(PageModel page) {
        return findAllBase(page, null);
    }

    public List findAll() {
        return findAllBase(null, null);
    }

    protected List findAllWithQuery(PageModel page, Query query, Object... params) {
        ensureSession();
        List list;
        try {
            if (page != null) {
                query.setMaxResults(page.getEveryPage());
                query.setFirstResult(page.getBeginIndex());
            }
            for (int i = 0; i < params.length; i++) {
                query.setParameter(i, params[i]);
            }
            list = query.list();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            session.close();
        }
        return list;
    }

    protected List findAllWithQuery(PageModel page, Query query, Map<String, Object> params) {
        ensureSession();
        List list;
        try {
            if (page != null) {
                query.setMaxResults(page.getEveryPage());
                query.setFirstResult(page.getBeginIndex());
            }
            for (String key : params.keySet()) {
                query.setParameter(key, params.get(key));
            }
            list = query.list();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            session.close();
        }
        return list;
    }

    protected List findAllBase(PageModel page, String condition) {
        ensureSession();
        List list;
        try {
            StringBuilder builder = new StringBuilder();
            builder.append(String.format("from %s", TableName));
            if (!StringUtils.isEmpty(condition)) {
                builder.append(" ");
                builder.append(condition);
            }
            Query query = session.createQuery(builder.toString());
            if (page != null) {
                query.setMaxResults(page.getEveryPage());
                query.setFirstResult(page.getBeginIndex());
            }
            list = query.list();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            session.close();
        }
        return list;
    }

    public int count() {
        ensureSession();
        String hql = "select count(*) from %s";
        Query query = session.createQuery(String.format(hql, TableName));
        return ((Long) query.uniqueResult()).intValue();
    }

    private void doTransaction() {
        Transaction transaction = session.beginTransaction();
        try {
            transaction.commit();
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
        }
    }

    protected void ensureSession(){
        if (sessionFactory ==null || sessionFactory.isClosed()){
            getSessionFactory();
        }
        session = sessionFactory.openSession();
    }

    public void getSessionFactory(){
        final StandardServiceRegistry registry = new StandardServiceRegistryBuilder().configure().build();
        try {
            sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
        } catch (Exception e){
            e.printStackTrace();
            StandardServiceRegistryBuilder.destroy(registry);
        }
    }
}
