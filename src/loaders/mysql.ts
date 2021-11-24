// import mongoose from 'mongoose';
import mysql from 'mysql2/promise';
import config from '../config';

export default async (): Promise<mysql.PoolConnection> => {
    // console.log(config.mysqlDB);
    let pool = await mysql.createPool(config.mysqlDB);
    const connection = await pool.getConnection();

    return connection;
};