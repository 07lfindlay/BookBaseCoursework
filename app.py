from flask import Flask, render_template
from neo4j import GraphDatabase, basic_auth
app = Flask(__name__)


def makeQuery(q):
    driver = GraphDatabase.driver(
      "bolt://3.236.43.173:7687",
      auth=basic_auth("neo4j", "roads-post-countries"))
    cypher_query = q
    with driver.session(database="neo4j") as session:
      results = session.read_transaction(
        lambda tx: tx.run(cypher_query).data())
      #for record in results:
        #print(record['n'])
    driver.close()
    return results




@app.route('/')
def main():
    """yoooooooo"""
    results = makeQuery('''
    MATCH (n:Text)
    RETURN n
    ''')
    books = [(record['n']) for record in results]

    y = type(books[0])
    #print(books[0]['title'])
    return render_template('main.html', books=books)


@app.route('/text/<string:text_name>')
def text(text_name):
    q = '''
    MATCH (n:Text {title: '%s'})
    RETURN n
    ''' % (str(text_name))
    text_record = makeQuery(q)
    print(text_record)
    return render_template('text.html', text_name=text_name, text_record=text_record)


@app.route('/graph')
def graph():
    print("hi")
    results = makeQuery('''
        MATCH (n:Text)
        RETURN n
        ''')
    books = [(record['n']) for record in results]
    writresults = makeQuery('''
            MATCH (n:Author)
            RETURN n
            ''')
    writer = [(record['n']) for record in writresults]
    influences = makeQuery('''
                        Match (n :Text)-[r :INFLUENCED]->(n2 :Text) 
                        RETURN r.start, r.end, r.Influence
                        ''')
    wrote = makeQuery('''
                        Match (n :Author)-[r :WROTE]->(n2 :Text)
                        RETURN r.start, r.end
                        ''')
    print(influences[0]['r.start'][0])
    print(books[0])
    print(writer[3]['name'])
    print(wrote)
    return render_template('graph.html', books=books, influences=influences, writer=writer, wrote=wrote)


if __name__ == '__main__':
    app.run(debug=True, use_debugger=False, use_reloader=False, passthrough_errors=True)
