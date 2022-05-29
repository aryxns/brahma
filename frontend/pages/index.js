import { Box, Button, Center, Divider, Flex, HStack, IconButton, Input, InputGroup, InputRightAddon, InputRightElement, Link, SimpleGrid, Skeleton, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { ArrowForwardIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import axios from "axios";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
// import { CodeEditorEditable } from 'react-code-editor-editable';
// import 'highlight.js/styles/dracula.css';
import { useToast } from '@chakra-ui/react'

export default function Home() {
  const toast = useToast();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [scores, setScores] = useState(null);
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState("");
  const [savedScores, setSavedScores] = useState(null);

  const calcScore = async () => {
    setIsButtonLoading(true);
    setScores(null);
  
    try {
      const {data} = await axios.post(`https://rhetorical-coat-production.up.railway.app/score?address=${address}`, JSON.parse(query));
      setScores(parseFloat(data).toFixed(2));
      setIsButtonLoading(false);
      const saved_scores = localStorage.getItem("saved_scores");
      console.log(saved_scores);
      if(saved_scores != "null" && saved_scores != null) {
        const parsed_saved_scores = JSON.parse(saved_scores);
        localStorage.setItem("saved_scores", JSON.stringify([...parsed_saved_scores, {
          score: parseFloat(data).toFixed(2),
          address: address
        }]));
      } else {
        localStorage.setItem("saved_scores", JSON.stringify([{
          score: parseFloat(data).toFixed(2),
          address: address
        }]));
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Eesh.',
        description: "Error fetching your score. Please refresh and try again.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("saved_scores")));
    setSavedScores(JSON.parse(localStorage.getItem("saved_scores")));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>TrustQL</title>
        <meta name="description" content="TrustQL, on-chain reputation query language for your DApp!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
        height: "100vh",
        backgroundColor: "#FFF8E7"
      }}>
        <SimpleGrid my={10} height="100%" columns={2} spacing={10}>
          <Box height="100%">
            {/* <CodeEditorEditable
              value={value}
              setValue={setValue}
              width='50vw'
              height='50vh'
              language='html'
              inlineNumbers
            /> */}
            {/* <Editor
              value={query}
              onValueChange={code => setQuery({ code })}
              highlight={code => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            /> */}
            <Textarea onChange={(e) => setQuery(e.target.value)} height="76%" backgroundColor="white" border="none" focusBorderColor="white" />
            {/* <JSONInput
              id='xyz'
              placeholder={{}}
              theme="light_mitsuketa_tribute"
              locale={locale}
              colors={{
                string: "#DAA520"
              }}
              style={{
                outerBox: {
                  borderRadius: "10px",
                  marginBottom: 0
                },
                container: {
                  borderRadius: "10px",
                  marginBottom: 0
                }
              }}
              onChange={(e) => setQuery(e.target.value)}
              height="78%"
              width="100%"
            /> */}
            {/* <HStack mt={10}>
              <Button className={styles.favButton} width="100%" isLoading={isButtonLoading} height="10" onClick={isButtonLoading != true ? calcScore : null}>Find Score</Button>
              <Button rightIcon={<ArrowForwardIcon />} className={styles.favButton} bgGradient='linear(to-l, #7928CA, #FF0080)' width="100%" isLoading={isButtonLoading} height="10" onClick={isButtonLoading != true ? calcScore : null}>Find Score</Button>
            </HStack> */}
            <InputGroup marginTop="20px">
              <Input borderRadius="10" backgroundColor="#fff" paddingTop="5" paddingBottom="5" borderColor="#fff" onChange={(e) => setAddress(e.target.value)} placeholder="Your address" />
              <InputRightElement width='4.5rem'>
                <IconButton backgroundColor="#5E024D" color="#fff" isLoading={isButtonLoading} h='1.75rem' size='sm' onClick={!isButtonLoading ? calcScore : null} icon={<ArrowForwardIcon />} />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box height="100%">
              <VStack spacing={8}>
                {scores ? (
                  <Center borderRadius="10px" bg="#FCE3DC" width="100%" height="35vh">
                    <VStack>
                      <h4 style={{
                        color: "#5E024D",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: 1.2
                      }}>Your score</h4>
                      <h1 className={styles.scoreNumber}>{scores}</h1>
                    </VStack>
                  </Center>
                ) : (
                  <Skeleton borderRadius="10px" width="100%">
                    <Box height="35vh">
                      h
                    </Box>
                  </Skeleton>
                )}

                <Box borderRadius="10px" padding="15px" bg="#FCE3DC" width="100%" height="45vh">
                  {savedScores == null || savedScores.length == 0 || savedScores == "null" && (<h4 style={{
                        color: "#5E024D",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: 1.2
                      }}>Your score</h4>)}

                  {savedScores && savedScores != "null" && savedScores != null && (
                    <h4 style={{
                      color: "#5E024D",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: 1.2,
                      paddingBottom: "10px"
                    }}>Saved scores</h4>
                  )}

                  {savedScores && savedScores != "null" && savedScores != null ? savedScores.map((item, index) => {
                    return (
                      <p key={index} style={{
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}>{item.address.substring(0, 5)}...{item.address.substring(item.address.length - 5)} <ArrowForwardIcon /> {item.score}</p>
                    )
                  }): null}

                  <p style={{
                    display: "block",
                    paddingTop: "10px"
                  }}>For a detailed breakdown of how we evaluated your address, visit <Link href="https://ayshptk.gitbook.io/pied-piper-docs/" isExternal={true}>here <ExternalLinkIcon mx='2px' /></Link>.</p>
                </Box>
              </VStack>
          </Box>
        </SimpleGrid>
      </div>

      {/* <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
