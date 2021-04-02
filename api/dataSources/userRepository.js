import AWS from 'aws-sdk';
import { DataSource } from 'apollo-datasource';
import { v4 as uuidv4 } from 'uuid';
import { base64EncodeObj, base64DecodeObj } from '../utils/encode';
import { config } from '../utils/config';

const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: config.REGION,
    endpoint: config.DYNAMODB_ENDPOINT
});

const indexes = {
    EMAIL_ADDRESS_ASC: 'emailAddress-index',
    NAME_ASC: 'fullName-index'
};

export class UserRepository extends DataSource {
    async getById(id) {
        const params = {
            TableName: config.DYNAMODB_USERS,
            Key: { id }
        };

        const result = await dynamoDb.get(params).promise();

        return this._map(result.Item);
    }

    async getByEmailAddress(emailAddress) {
        const params = {
            TableName: config.DYNAMODB_USERS,
            IndexName: indexes.EMAIL_ADDRESS_ASC,
            ExpressionAttributeNames: { '#emailAddress': 'emailAddress' },
            ExpressionAttributeValues: { ':emailAddress': emailAddress },
            KeyConditionExpression: '#emailAddress = :emailAddress',
            Limit: 1
        };

        const result = await dynamoDb.query(params).promise();

        return this._map(result.Items[0]);
    }

    create = this.update;

    async update(user) {
        const item = this._generate(user);

        const params = {
            TableName: config.DYNAMODB_USERS,
            Item: item
        };

        await dynamoDb.put(params).promise();

        return this._map(item);
    }

    async remove(user) {
        const params = {
            TableName: config.DYNAMODB_USERS,
            Key: { id: user.id }
        };

        await dynamoDb.delete(params).promise();

        return this._map(user);
    }

    async upsert(user) {
        const existing = await this.getByEmailAddress(user.emailAddress);
        return this.update({ ...existing, ...user });
    }

    async search(request) {
        const index = indexes[request.sort] || indexes.USERS_NAME_ASC;

        const params = {
            TableName: config.DYNAMODB_USERS,
            IndexName: index,
            Limit: 10,
            ExclusiveStartKey: base64DecodeObj(request.cursor)
        };

        if (request.search) {
            params.ExpressionAttributeNames = {
                '#search': 'search'
            };
            params.ExpressionAttributeValues = {
                ':search': request.search.toLowerCase()
            };
            params.FilterExpression = 'contains(#search, :search)';
        }

        const result = await dynamoDb.scan(params).promise();

        return {
            items: result.Items.map(this._map),
            after: base64EncodeObj(result.LastEvaluatedKey)
        };
    }

    _generate = user => ({
        ...user,
        id: user.id || uuidv4(),
        isLockedOut: user.isLockedOut,
        password: user.password,
        passwordResetToken: user.passwordResetToken,
        fullName: `${user.firstName} ${user.lastName}`,
        search: `${user.firstName} ${user.lastName} ${user.emailAddress}`.toLowerCase()
    });

    _map = user => {
        if (!user) {
            return undefined;
        }

        return {
            id: user.id,
            emailAddress: user.emailAddress,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            isLockedOut: user.isLockedOut,
            passwordResetToken: user.passwordResetToken,
            roles: user.roles
        };
    };
}
