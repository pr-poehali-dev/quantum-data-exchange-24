import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Регистрация гражданина КРР и получение счётчика граждан."""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if event.get('httpMethod') == 'GET':
        cur.execute('SELECT COUNT(*) FROM citizens')
        count = cur.fetchone()[0]
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'count': count})
        }

    if event.get('httpMethod') == 'POST':
        body = json.loads(event.get('body') or '{}')
        name = (body.get('name') or '').strip()

        if not name:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Имя не может быть пустым'})
            }

        cur.execute('INSERT INTO citizens (name) VALUES (%s)', (name,))
        conn.commit()
        cur.execute('SELECT COUNT(*) FROM citizens')
        count = cur.fetchone()[0]
        cur.close()
        conn.close()
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'success': True, 'count': count})
        }

    cur.close()
    conn.close()
    return {'statusCode': 405, 'headers': cors_headers, 'body': ''}
